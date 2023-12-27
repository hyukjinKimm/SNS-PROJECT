const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
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
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, {
      onDelete: "CASCADE",
    }); // UserId 컬럼 생성
    db.Comment.belongsTo(db.Post, {
      onDelete: "CASCADE",
    });
    db.Comment.belongsToMany(db.User, {
      through: "UserLikeComment",
      as: "CommentLikers",
      onDelete: "CASCADE",
    });
    db.Comment.belongsToMany(db.Comment, {
      through: "CommentToComment",
      as: "Recommented",
      foreignKey: "RecommentId",
    });
    db.Comment.belongsToMany(db.Comment, {
      through: "CommentToComment",
      as: "Recommentings",
      foreignKey: "RecommentedId",
    });
  }
}

module.exports = Comment;
