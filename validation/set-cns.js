const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSetCnsInput(data) {
  let errors = {};

  data.cnsName = !isEmpty(data.cnsName) ? data.cnsName : '';
  data.cnsPassword = !isEmpty(data.cnsPassword) ? data.cnsPassword : '';

  if (!Validator.isLength(data.cnsName, { min: 8, max: 8 })) {
    errors.cnsName = 'CNSログイン名は7文字で入力してください';
  }

  if (Validator.isEmpty(data.cnsName)) {
    errors.cnsName = 'CNSログイン名を入力してください';
  }
  

  if (Validator.isEmpty(data.cnsPassword)) {
    errors.cnsPassword = 'CNSパスワードを入力してください';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
