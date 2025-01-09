'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.Event, {
        foreignKey: 'eventId',
      });
    }
  }
  Result.init({
    competitorId: DataTypes.INTEGER,
    competitionId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    // each result has 3 or 5 times, depending on event
    time1: DataTypes.FLOAT,
    time2: DataTypes.FLOAT,
    time3: DataTypes.FLOAT,
    time4: DataTypes.FLOAT,
    time5: DataTypes.FLOAT,
    // to be populated depending on individual times (and event)
    single: DataTypes.FLOAT,
    average: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Result',
    timestamps: false,
  });
  return Result;
};