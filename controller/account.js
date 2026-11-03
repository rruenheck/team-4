import { getAccount } from "../service/account.js";

export const showAccount = async (req, res) => {
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
