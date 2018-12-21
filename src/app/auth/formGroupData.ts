export const formGroupData = {
  username: {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter a username",
    info: "You can change this later",
    err: "usernameErr",
    first: true
  },
  email: {
    name: "email",
    type: "email",
    label: "Email address",
    placeholder: "Enter an email",
    info: "We'll never share your email with anyone else.",
    err: "emailErr",
    first: false
  },
  password: {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter a password",
    info: "Make sure it is a least 6 characters long.",
    err: "passwordErr",
    first: false
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Enter a password",
    info: "Make sure your password is the same as above!",
    err: "confirmPasswordErr",
    first: false
  }
};
