
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    lecture_id: DataTypes.INTEGER
  }, {
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.User);
    Reservation.belongsTo(models.Lecture);
  };
  return Reservation;
};