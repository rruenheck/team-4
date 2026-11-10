import { expect, jest, test } from "@jest/globals";

jest.unstable_mockModule("../repository/user.js", () => ({
  findUser: jest.fn(),
  create: jest.fn(),
  findById: jest.fn()
}));

jest.unstable_mockModule("bcrypt", () => ({
    default: {compare: jest.fn(), hash: jest.fn()}
}));

const { register, login } = await import("../service/auth.js");
const user = await import("../repository/user.js");
const { default: bcrypt } = await import("bcrypt");
const { getAccount } = await import("../service/account.js");

test("register rejects a missing email", async () => {
    await expect(
        register({name: "Test User", password: "123pass"})).rejects.toThrow("Email and password required");
});

test("register rejects a missing password", async () => {
    await expect(
        register({name: "Test User", email: "example@test.com"})).rejects.toThrow("Email and password required");
});

test("login rejects a missing email", async () => {
    await expect(
        login({name: "Test User", password: "123pass"})).rejects.toThrow("Email and password required");
});

test("login rejects a missing password", async () => {
    await expect(
        login({name: "Test User", email: "example@test.com"})).rejects.toThrow("Email and password required");
});

test("register rejects an existing email", async () => {
    const existingUser = {email: "example@test.com"};
    user.findUser.mockResolvedValueOnce(existingUser);
    await expect(
        register({name: "Test User", email: "example@test.com", password: "123pass"})).rejects.toThrow("Email already registered");
});

test("login rejects an unregistered email", async () => {
    user.findUser.mockResolvedValueOnce(null);
    await expect(
        login({name: "Test User", email: "example@test.com", password: "123pass"})).rejects.toThrow("Email not registered");
});

test("login rejects an incorrect password", async () => {
    user.findUser.mockResolvedValueOnce({passwordHash: "fake-hash"});
    bcrypt.compare.mockResolvedValueOnce(false);
    await expect(login({email: "example@test.com", password: "wrong-password"})).rejects.toThrow("Invalid password");
});

test("getAccount returns null when the account is not found", async () => {
    user.findById.mockResolvedValueOnce(null);
    const result = await getAccount("missing-id");
    expect(result).toBeNull();
});

test("register saves a new user with a hashed password", async () => {
    user.findUser.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce("fake-hash");
    user.create.mockResolvedValueOnce("user-123");
    const result = await register({name: "Test User", email: "example@test.com", password: "123pass"});
    expect(user.create).toHaveBeenCalledWith({name: "Test User", email: "example@test.com", passwordHash: "fake-hash"});
    expect(result).toEqual({id: "user-123", name: "Test User", email: "example@test.com"});
});