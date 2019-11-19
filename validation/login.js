const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = '無効なメールアドレスです';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'メールアドレスを入力してください';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'パスワードを入力してください';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
