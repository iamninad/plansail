const errors = {
  username: "",
  password: "",
  confPassword: "",
};
export class FormValidator {
  static validateRegForm(username: string, password: string, confPassword: string) {
    // Validate username
    if (username.length > 10 || username.length < 4) {
      errors.username = "Username should be 4-10 letters";
    } else if (!/^[a-zA-Z]/.test(username)) {
      errors.username = "Username should start with a alphabet (a-z or A-Z)";
    } else {
      errors.username = "";
    }

    // Validate password
    if (!/[A-Z]/.test(password)) {
      errors.password =
        "Password should contain atleast one uppercase character";
    } else if (!/[a-z]/.test(password)) {
      errors.password =
        "Password should contain atleast one lowercase character";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password should contain atleast one number";
    } else if (password.length > 25 || password.length < 6) {
      errors.password = "Password should be 6-25 lettters";
    } else {
      errors.password = "";
    }

    // Validate confirm password
    if (password === confPassword) {
      errors.confPassword = "";
    } else {
      errors.confPassword = "Password and confirm password do not match";
    }

    return errors;
  }

  static validateLoginForm(password:string) {
    // Validate password
    if (!/[A-Z]/.test(password)) {
      errors.password =
        "Password should contain atleast one uppercase character";
    } else if (!/[a-z]/.test(password)) {
      errors.password =
        "Password should contain atleast one lowercase character";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password should contain atleast one number";
    } else if (password.length > 25 || password.length < 6) {
      errors.password = "Password should be 6-25 lettters";
    } else {
      errors.password = "";
    }
    
    return errors;
  }
}
