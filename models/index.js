// index.js in models folder collects and exports model data

const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

// create associations

//associate creates reference for `id` column in `User` model to link to corresponding foreign key pair (the `user_id` in the `Post` model.)
User.hasMany(Post, {
  foreignKey: 'user_id',
})

//reverse association - define relationship of `Post` model to `User`
//constraint: post can belong to one user only
//declare link to the foreign key designated at `user_id` in the `Post` model
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
})

module.exports = {
  User,
  Post,
  Comment,
}
