const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    console.log(req.body);
    return next();
  } catch (err) {
    console.log(req.body);

    console.log(err);
    const status = 422;
    const extraDetailes = err.errors[0].message;
    const message = "Fill the input Properly";
    console.log(message);
    // res.status(400).json({msg:message});

    const error = {
      status,
      message,
      extraDetailes,
    };
    next(error);
  }
};

module.exports = validate;
