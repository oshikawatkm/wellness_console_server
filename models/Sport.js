'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('Sport', {
    name: DataTypes.STRING,
    teacher: DataTypes.STRING,
    week: DataTypes.STRING,
    time: DataTypes.INTEGER,
    first_num: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    first_d: DataTypes.INTEGER
  }, {
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Sport.associate = function(models) {
    // associations can be defined here
    Sport.hasMany(models.Lecture, {foreignKey: 'sport_id'});
  };
  return Sport;
};