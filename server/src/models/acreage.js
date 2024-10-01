'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acreage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Acreage.init({
    code : DataTypes.STRING,
    value : DataTypes.STRING,
    order : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Acreage',
  });
  return Acreage;
};