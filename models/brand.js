'use strict';

module.exports = (sequelize, DataTypes) => {

  var Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    logo:DataTypes.STRING,
  }, 
  
  {
    tableName:'brands',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Brand;

};
