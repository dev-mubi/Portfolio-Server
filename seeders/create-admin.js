const { Admin } = require('../models');
const { testConnection } = require('../config/database');
require('dotenv').config();

const createAdmin = async () => {
  try {
    console.log('🔄 Creating admin user...\n');

    await testConnection();

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ 
      where: { email: process.env.ADMIN_EMAIL || 'admin@portfolio.com' } 
    });

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log(`   Email: ${existingAdmin.email}`);
      
      // Update password
      existingAdmin.password = process.env.ADMIN_PASSWORD || 'admin123';
      await existingAdmin.save();
      console.log('✅ Admin password updated');
    } else {
      // Create new admin
      const admin = await Admin.create({
        email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
        password: process.env.ADMIN_PASSWORD || 'admin123'
      });
      console.log('✅ Admin user created');
      console.log(`   Email: ${admin.email}`);
    }

    console.log('\n📝 Login Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n⚠️  Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create admin:', error);
    process.exit(1);
  }
};

createAdmin();
