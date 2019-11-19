const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEditUserInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

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



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
