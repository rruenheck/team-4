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
    res.status(500).send("Could not load account");
  }
};
