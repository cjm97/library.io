const { DataTypes, Model } = require('sequelize');
let dbConnect = require('../dbConnect');
const User = require('./users');
const Book = require('./book');

const sequelizeInstance = dbConnect.Sequelize;

class ToReadBooks extends Model {}

//Sequelize will create this table if it doesn't exist on startup
ToReadBooks.init(
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
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: BookList,
        key: 'id',
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'toreadbooks', //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = ToReadBooks;
