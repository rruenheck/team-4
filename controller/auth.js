import * as auth from "../service/auth.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await auth.register({ name, email, password });

    if (req.get("HX-Request")) {
      return res
        .status(201)
        .render("partials/register-message", { user, error: null });
    }

    res.status(201).json(user);
  } catch (err) {
    if (req.get("HX-Request") && err.status && err.status < 500) {
      return res
        .status(err.status)
        .render("partials/register-message", {
          user: null,
          error: err.message,
        });
    }
    return next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await auth.login({ email, password });

    req.session.regenerate((err) => {
      if (err) {
        const sessionError = new Error("Could not create login session");
        sessionError.status = 500;
        sessionError.cause = err;
        return next(sessionError);
      }
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          const sessionError = new Error("Could not save login session");
          sessionError.status = 500;
          sessionError.cause = err;
          return next(sessionError);
        }

        res.status(200).json(user);
      });
    });
  } catch (err) {
    return next(err);
  }
};
