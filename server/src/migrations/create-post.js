'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.STRING,
        defaultValue: '0'
      },
      labelCode: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING
      },
      attributesID: {
        type: Sequelize.STRING
      },
      categoryCode: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      userID: {
        type: Sequelize.STRING
      },
      acreageCode : {
        type :Sequelize.STRING
      },
      priceCode : {
        type : Sequelize.STRING
      },
      priceNumber : {
        type : Sequelize.FLOAT
      },
      provinceCode : {
        type : Sequelize.STRING
      },
      acreageNumber : {
        type : Sequelize.FLOAT
      },
      overviewID: {
        type: Sequelize.STRING
      },
      imagesID: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};