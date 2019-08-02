'use strict';

module.exports = (sequelize, DataTypes) => {

  var Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    icon:DataTypes.STRING,
    parent_id:DataTypes.INTEGER,
  }, 
  
  {
    tableName:'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Category;

};
