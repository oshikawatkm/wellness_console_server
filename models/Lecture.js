
module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    date: DataTypes.DATE,
    lecture: DataTypes.INTEGER,
    d: DataTypes.INTEGER,
    sport_id: DataTypes.INTEGER
  }, {
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Lecture.associate = function(models) {
    // associations can be defined here
    Lecture.belongsTo(models.Sport);
    Lecture.hasMany(models.Reservation, {foreignKey: 'id'});
    Lecture.hasMany(models.Cashe, {foreignKey: 'id'});
  };
  return Lecture;
};