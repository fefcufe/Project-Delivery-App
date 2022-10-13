const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, { 
    timestamps: false,
    sequelize,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (db) => {
    User.hasMany(db.Sale, {
      foreignKey: 'userId', as: 'saleUser'
    });
    User.hasMany(db.Sale, {
      foreignKey: 'sellerId', as: 'saleSeller'
    });
  }

  return User;
}

module.exports = UserModel;