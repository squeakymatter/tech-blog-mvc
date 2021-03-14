//import Model & DataTypes from sequelize package
const { Model, DataTypes } = require('sequelize')
//import connection to MySQL stored in `connection.js`
const sequelize = require('../config/connection')

//define `Post` model
class Post extends Model {}

//define columns in Post, configure  naming conventions and pass current connection instances to initailize `Post` model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      //establish relationship between this post and the user by creating reference to the `User` model-->`id` column defined by the `key` property, which is the primary key
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
)

module.exports = Post
