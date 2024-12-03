const { body, validationResult } = require("express-validator");
const { CustomErrorHandler } = require("./errorsMiddleware");

exports.loginValidation = async (req, res, next) => {
  const rules = [
    // Validate "mail" field
    body("email")
      .trim()
      .normalizeEmail()
      .notEmpty()
      .withMessage("Email is mandatory")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .withMessage("Email must be in a valid format (e.g., user@example.com)"),
    // Validate "phone" field
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Password is mandatory")
      .isString()
      .withMessage("Password must be an valid string")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .withMessage(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
      ),
  ];
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(
      new CustomErrorHandler(
        400,
        errors
          .array()
          .map((ele) => ele.msg)
          .join(", ")
      )
    );
  }
  next();
};
