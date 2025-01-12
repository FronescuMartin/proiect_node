'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Competition extends Model {
    static associate(models) {
      Competition.belongsToMany(models.Competitor, {
        through: models.Result,
      });
    }
  }
  Competition.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Competition',
  });
  return Competition;
};