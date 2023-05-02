const { DataTypes, Model } = require('sequelize');
let dbConnect = require('../dbConnect');
const User = require('./users');
const Books = require('./books');

const sequelizeInstance = dbConnect.Sequelize;

class ReadBooks extends Model {}

//Sequelize will create this table if it doesn't exist on startup
ReadBooks.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      references: {
        model: Books,
        key: 'id',
      },
    },
    user_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    user_review: {
      type: DataTypes.STRING(10000),
      allowNull: true,
      required: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'readbooks', //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ReadBooks;
