import {
  getAccount,
  updateName,
  makeAdmin as makeAdminService,
} from "../service/account.js";
export const showAccount = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    const account = await getAccount(req.session.userId);
    if (!account) {
      return res.redirect("/login");
    }

    res.render("account", { title: "Account", account });
  } catch (err) {
    const accountError = new Error("Could not load account");
    accountError.status = 500;
    accountError.cause = err;
    return next(accountError);
  }
};

export const updateAccName = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  try {
    await updateName(req.params.id, req.session.userId, req.body.name);

    return res.redirect("/account");
  } catch (err) {
    return next(err);
  }
};

export const makeAdmin = async (req, res, next) => {
  try {
    const { passwordHash, ...user } = await makeAdminService(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    if (err.status && err.status < 500) {
      return res.status(err.status).json({ error: err.message });
    }
    next(err);
  }
};
