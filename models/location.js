'use strict';

module.exports = (sequelize, DataTypes) => {

  var Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    type:DataTypes.INTEGER,
    parent_id:DataTypes.INTEGER,
  }, 
  
  {
    tableName:'locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Location;

};
