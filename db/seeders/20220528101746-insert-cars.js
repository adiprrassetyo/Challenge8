'use strict';

const carnames = [
  "Mazda RX4",
  "Mazda RX4 Wag",
  "Datsun 710",
  "Hornet 4 Drive",
  "Hornet Sportabout",
  "Valiant",
  "Duster 360",
  "Merc 240D",
  "Merc 230",
  "Merc 280",
  "Merc 280C",
  "Merc 450SE",
  "Merc 450SL",
  "Merc 450SLC",
  "Cadillac Fleetwood",
  "Lincoln Continental",
  "Chrysler Imperial",
  "Fiat 128",
  "Honda Civic",
  "Toyota Corolla",
  "Toyota Corona",
  "Dodge Challenger",
  "AMC Javelin",
  "Camaro Z28",
  "Pontiac Firebird",
  "Fiat X1-9",
  "Porsche 914-2",
  "Lotus Europa",
  "Ford Pantera L",
  "Ferrari Dino",
  "Maserati Bora",
  "Volvo 142E",
]

const sizes = ["SMALL", "MEDIUM", "LARGE"];

module.exports = {
  async up (queryInterface, Sequelize) {
    const cars = [];

    sizes.forEach((size) => {
      cars.push(
        ...carnames.map((name, i) => {
          const accumulator = i.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });

          const timestamp = new Date();

          return ({
            name,
            price: 300000,
            size,
            image: `https://source.unsplash.com/5${accumulator}x5${accumulator}`, 
            isCurrentlyRented: false,
            createdAt: timestamp,
            updatedAt: timestamp,
          })
        })
      )
    })
    await queryInterface.bulkInsert('Cars', cars, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
