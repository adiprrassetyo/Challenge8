'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.UserCar, {
        foreignKey: "carId",
        as: "userCar",
      })
    }

    // toJSON() {
    //   return {
    //     id: this.id,
    //     name: this.name,
    //     price: this.price,
    //     size: this.size,
    //     image: this.image,
    //     createdAt: this.createdAt,
    //     updatedAt: this.updatedAt,
    //     rentStartedAt: this.UserCar?.rentStartedAt,
    //     rentEndedAt: this.UserCar?.rentEndedAt,
    //   }
    // }
  }
  Car.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    isCurrentlyRented: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};
