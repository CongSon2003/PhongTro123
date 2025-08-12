'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.belongsTo(models.images,{foreignKey : 'imagesID',targetKey : 'id',as : 'imagesData'})
      post.belongsTo(models.attribute,{foreignKey : 'attributesID',targetKey : 'id',as : 'attributesData'})
      post.belongsTo(models.User,{foreignKey : 'userID',targetKey : 'id',as : 'userData'})
      post.belongsTo(models.overview,{foreignKey : 'overviewID',targetKey : 'id',as : 'overviewData'})
      post.belongsTo(models.label,{foreignKey : 'labelCode',targetKey : 'code', as : 'labelData'})
    }
  }
  post.init({
    title: DataTypes.STRING,
    star: DataTypes.STRING,
    labelCode: DataTypes.STRING,
    address: DataTypes.STRING,
    attributesID: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    priceCode: DataTypes.STRING,
    priceNumber: DataTypes.FLOAT,
    acreageCode: DataTypes.STRING,
    acreageNumber : DataTypes.FLOAT,
    description: DataTypes.TEXT,
    userID: DataTypes.STRING,
    overviewID: DataTypes.STRING,
    imagesID: DataTypes.STRING,
    provinceCode : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};