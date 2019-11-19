'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    cnsName: DataTypes.STRING,
    cnsPassword: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: async (instance, next) => {
        console.log(instance)
        if (!instance.changed('password')) {
          next();
        }
        
        const salt = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
      }
    },
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Reservation, {foreignKey: 'user_id'});
    User.hasMany(models.Cashe, {foreignKey: 'user_id'});
  };
  User.prototype.beforeSave = async function(next) {
    if (!this.isModified('password')) {
      next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  };
  User.prototype.getSignedJwtToken = function(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }
  User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  User.prototype.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  return User;
};