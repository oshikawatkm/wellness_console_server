'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cashe = sequelize.define('Cashe', {
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    lecture_id: DataTypes.INTEGER
  }, {
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Cashe.associate = function(models) {
    // associations can be defined here
    Cashe.belongsTo(models.User);
    Cashe.belongsTo(models.Lecture);
  };
  return Cashe;
};