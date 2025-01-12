'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.Event, {
        foreignKey: 'eventId',
        onDelete: 'cascade',
      });

      Result.belongsTo(models.Competition, {
        foreignKey: 'competitionId',
        onDelete: 'cascade',
      });
      Result.belongsTo(models.Competitor, {
        foreignKey: 'competitorId',
        onDelete: 'cascade',
      });
    }
  }
  Result.init({
    competitorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    competitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['competitorId', 'competitionId', 'eventId']
      }
    ]
  });
  return Result;
};