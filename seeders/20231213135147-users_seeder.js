'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash("123456", salt);

    const usersData = [
      {
        id: 1,
        name: 'User 1',
        email: 'user1@gmail.com',
        password,
        createdAt: '2023-12-01 11:32:57',
        updatedAt: '2023-12-11 14:12:13'
      },
      {
        id: 2,
        name: 'User 2',
        email: 'user2@gmail.com',
        password,
        createdAt: '2023-12-01 11:33:09',
        updatedAt: '2023-12-01 11:33:09'
      },
      {
        id: 3,
        name: 'User 3',
        email: 'user3@gmail.com',
        password,
        createdAt: '2023-12-01 11:34:27',
        updatedAt: '2023-12-11 14:24:21'
      },
      {
        id: 4,
        name: 'User 4',
        email: 'user4@gmail.com',
        password,
        createdAt: '2023-12-01 11:41:38',
        updatedAt: '2023-12-01 11:41:38'
      }
    ];

    return queryInterface.bulkInsert('users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
