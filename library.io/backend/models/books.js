const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Books extends Model {}

//Sequelize will create this table if it doesn't exist on startup
Books.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      primaryKey: true,
    },
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    book_subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    book_description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    book_publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    book_pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: false,
    },
    book_category: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    book_author: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "books", //use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Books;
