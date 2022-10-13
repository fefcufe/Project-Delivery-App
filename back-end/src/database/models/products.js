const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, { 
    timestamps: false,
    sequelize,
    tableName: 'products',
    underscored: true,
  });

  Product.associate = (db) => {
    Product.hasMany(db.SalesProducts, {
      foreignKey: 'productId', as: 'sales_products'
    });
  }

  return Product;
}

module.exports = ProductModel;