const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_en: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name_bn: {
    type: DataTypes.STRING(255)
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  sku: {
    type: DataTypes.STRING(100),
    unique: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subcategory_id: {
    type: DataTypes.INTEGER
  },
  brand_id: {
    type: DataTypes.INTEGER
  },
  seller_id: {
    type: DataTypes.INTEGER
  },
  regular_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  selling_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  discount_price: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  discount_percent: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  discount_start_date: {
    type: DataTypes.DATE
  },
  discount_end_date: {
    type: DataTypes.DATE
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock_status: {
    type: DataTypes.ENUM('in_stock', 'out_of_stock', 'pre_order'),
    defaultValue: 'in_stock'
  },
  low_stock_threshold: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  description_en: {
    type: DataTypes.TEXT
  },
  description_bn: {
    type: DataTypes.TEXT
  },
  specification_en: {
    type: DataTypes.TEXT
  },
  specification_bn: {
    type: DataTypes.TEXT
  },
  featured_image: {
    type: DataTypes.STRING(255)
  },
  gallery_images: {
    type: DataTypes.JSON
  },
  video_url: {
    type: DataTypes.STRING(255)
  },
  meta_title: {
    type: DataTypes.STRING(255)
  },
  meta_description: {
    type: DataTypes.TEXT
  },
  meta_keywords: {
    type: DataTypes.TEXT
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_new_arrival: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_best_seller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tags: {
    type: DataTypes.JSON
  },
  created_by: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;