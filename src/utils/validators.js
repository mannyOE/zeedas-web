const validator = {
  email: {
    rules: [
      {
        test: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
        message: "Please enter a valid email address",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  password: {
    rules: [
      {
        test: (value) => value.length >= 8,
        message: "8 or more characters",
      },
      {
        test: /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
        message: "Special character",
      },
      {
        test: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        message: "Mixture of letters and numbers",
      },
      {
        test: /^(?=[a-z0-9!@#$%^&*()+=?]*[A-Z])(?=[A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*[a-z])[A-Za-z0-9!@#$%^&*()+=?]*$/,
        message: "Mixture of uppercase and lowercase",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  confirmPassword: {
    rules: [
      {
        test: (confirmPasswordValue, passwordValue) => confirmPasswordValue === passwordValue,
        message: "Passwords do not match",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  username: {
    rules: [
      {
        test: /^[a-zA-Z_]+$/i,
        message: "number not allowed",
      },
    ],
    errors: [],
    valid: false,
    state: "",
  },
  company: {
    rules: [{ test: "", message: "Please enter your company name" }],
    errors: [],
    valid: false,
    state: "",
  },
  fullName: {
    rules: [{ test: "", message: "Please enter your full name" }],
    errors: [],
    valid: false,
    state: "",
  },
  phoneNumber: {
    rules: [{ test: "", message: "Please enter your phone number" }],
    errors: [],
    valid: false,
    state: "",
  },
  name: {
    rules: [{ test: "", message: "Please enter a name" }],
    errors: [],
    valid: false,
    state: "",
  },
  description: {
    rules: [{ test: "", message: "Please enter a description" }],
    errors: [],
    valid: false,
    state: "",
  },
};

export default validator;
