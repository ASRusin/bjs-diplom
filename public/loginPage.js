"use strict";
const newUser = new UserForm();
newUser.loginFormCallback = function (data) {
  ApiConnector.login(data, (response) => {
    if (response.success === false) {
      newUser.setLoginErrorMessage(response.error);
    } else {
      location.reload();
    }
  });
};
newUser.registerFormCallback = function (data) {
  ApiConnector.register(data, (response) => {
    if (response.success === false) {
      newUser.setRegisterErrorMessage(response.error);
    } else {
      location.reload();
    }
  });
};
