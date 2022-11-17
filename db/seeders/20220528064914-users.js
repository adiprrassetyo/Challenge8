/* eslint-disable no-unused-vars */
"use strict";

const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  Role
} = require("../../app/models");

const names = ["Customer", "Fikri", "Brian", "Ranggawarsita", "Jayabaya"];

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123";
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    await queryInterface.bulkInsert(
      "Users",
      [{
          name: "Customer",
          email: "customer@gmail.com",
          encryptedPassword,
          roleId: 1,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        {
          name: "Admin",
          email: "admin@gmail.com",
          encryptedPassword,
          roleId: 2,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ], {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", {
      name: {
        [Op.in]: names
      }
    }, {});
  },
};