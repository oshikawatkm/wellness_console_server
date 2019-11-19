//---------------------------------sequelize commands--------------------------
// 
// User
// sequelize model:create --underscored --name User --attributes "name:string, email:string, password:string, cnsName:string, cnsPassword:string" 
//
// Sport
// sequelize model:create --underscored --name Sport --attributes "name:string, teacher:string, week:string, time:integer, first_num:integer, semester:integer, d:integer"
//
// Lecture
// sequelize model:create --underscored --name Lecture --attributes "name:string, date:date, lecture:integer, sport_id:integer"
// 
// Reservation
// sequelize model:create --underscored --name Reservation --attributes "status:string, user_id:string, lecture_id:string"
//
// Cashe
// sequelize model:create --underscored --name Cashe --attributes "status:string, user_id:integer, lecture_id:integer"
//
//-----------------------------------------------------------------------------

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;