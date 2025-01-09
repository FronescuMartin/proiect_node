'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(models.Result);
    }
  }
  Event.init({
    name: DataTypes.STRING,
    numberOfTimes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};