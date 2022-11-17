"use strict";

module.exports = {
  async up (queryInterface) {
    const names = [
      "CUSTOMER",
      "ADMIN",
    ];
    const timestamp = new Date();
    const records = names.map((name) => ({
      name,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert("Roles", records, {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete("Roles", null, {});
  }
};
