'use strict';
import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class Competitor extends Model {
    static associate(models) {
      Competitor.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Competitor.belongsToMany(models.Competition, {
        through: models.Result,
      });
    }
  }
  Competitor.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Competitor',
  });
  return Competitor;
};