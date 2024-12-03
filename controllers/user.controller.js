const { createUser } = require("../repository/user.repository");

exports.registerUser = async (req, res, next) => {
  try {
    const savedUser = await createUser(req.body);
    return res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};
