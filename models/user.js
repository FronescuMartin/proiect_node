'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Competitor, {onDelete: 'cascade'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isOrganizer: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};