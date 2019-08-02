'use strict';

module.exports = (sequelize, DataTypes) => {

  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    thumbnail:DataTypes.STRING,
    category_id:DataTypes.INTEGER,
    brand_id:DataTypes.INTEGER,
    price:DataTypes.FLOAT,
    description:DataTypes.TEXT,
  }, 
  
  {
    tableName:'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Product;

};
