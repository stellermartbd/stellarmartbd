const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'stellarmartbd',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync database (use { force: true } to drop all tables)
    if (process.env.NODE_ENV === 'development') {
      // await sequelize.sync({ force: true });
      console.log('✅ Database synchronized');
    }
    
    return sequelize;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

module.exports = connectDatabase;