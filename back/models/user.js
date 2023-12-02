const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        src: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: "default description",
        },
        birth: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao", "google", "naver"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, {
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {
      through: "UserLikePost",
      as: "PostLikings",
      onDelete: "CASCADE",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    db.User.belongsToMany(db.Comment, {
      through: "UserLikeComment",
      as: "CommentLikings",
      onDelete: "CASCADE",
    });
  }
}

module.exports = User;
