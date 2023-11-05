const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        content: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, {
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Comment, {
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Image, {
      onDelete: "CASCADE",
    });
    db.Post.belongsToMany(db.User, {
      through: "UserLikePost",
      as: "PostLikers",
      onDelete: "CASCADE",
    });
    db.Post.belongsToMany(db.Post, {
      through: "Retweet",
      as: "Retweeted",
      foreignKey: "RetweetId",
    });
    db.Post.belongsToMany(db.Post, {
      through: "Retweet",
      as: "Retweetings",
      foreignKey: "RetweetedId",
    });
  }
}

module.exports = Post;
