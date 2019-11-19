const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = '名前は２文字以上30文字未満で設定してください。';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = '名前を入力してください';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'メールアドレスを入力してください';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = '無効なメールアドレスです';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'パスワードを入力してください';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'パスワードは8文字以上30文字未満で入力してください。';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'パスワード確認を入力してください';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'パスワードが一致しません';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
