const SalesProductsModel = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    saleId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: DataTypes.INTEGER,
  }, { 
    timestamps: false,
    sequelize,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProducts.associate = (db) => {
    db.Sale.belongsToMany(db.Product, {
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SalesProducts,
    });

    db.Product.belongsToMany(db.Sale, {
      as: 'sale',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SalesProducts,
    });
  }

  return SalesProducts;
}

module.exports = SalesProductsModel;