"use strict";
const sequelize = new Sequelize('database', 'postgres.liagcjidevdramrvncxm', 'KFmb3mrQORl7YSaX', {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    dialect: 'postgres'
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
sequelize.close();
