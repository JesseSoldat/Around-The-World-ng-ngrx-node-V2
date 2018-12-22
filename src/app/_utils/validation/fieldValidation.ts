const errKeys = ["required", "nomatch", "minlength", "maxlength", "email"];

const getErrMsg = (key, length) => {
  const err = {
    required: "This field is required!",
    minlength: `This field has to be at least ${length} characters long!`,
    maxlength: `This field can not be over ${length} characters!`,
    email: "Please enter a valid email!",
    nomatch: "The passwords do not match!"
  };
  return err[key];
};

const handleMinMaxLength = (errObj, key) => {
  const requiredLength = errObj[key].requiredLength;
  return getErrMsg(key, requiredLength);
};

export const fieldValidation = errObj => {
  if (errObj === null) return null;

  let msg = null;

  errKeys.forEach(key => {
    if (errObj[key]) {
      if (key === "minlength" || key === "maxlength") {
        return (msg = handleMinMaxLength(errObj, key));
      }

      return (msg = getErrMsg(key, null));
    }
  });

  return msg;
};
