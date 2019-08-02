'use strict';

module.exports = (sequelize, DataTypes) => {

  var News = sequelize.define('News', {
    title: DataTypes.STRING,
    thumbnail:DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    township_id:DataTypes.INTEGER,
    start_date:DataTypes.DATE,
    end_date:DataTypes.DATE,
    status:DataTypes.INTEGER,
  }, 
  
  {
    tableName:'News',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return News;

};
