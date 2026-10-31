import * as auth from "../service/auth.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const user = await auth.register({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password required",
    });
  }

  try {
    const user = await auth.login({ email, password });

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({
          error: "Could not create login session",
        });
      }

      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({
            error: "Could not save login session",
          });
        }

        res.status(200).json(user);
      });
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
