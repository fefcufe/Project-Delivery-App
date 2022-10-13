const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,

  }, { 
    timestamps: false,
    sequelize,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (db) => {
    Sale.hasMany(db.SalesProducts, {
      foreignKey: 'saleId',
      as: 'sales_products',
    });
    
    Sale.belongsTo(db.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Sale.belongsTo(db.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  }

  return Sale;
}

module.exports = SaleModel;