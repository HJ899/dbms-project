const db = require('../util/database');
const dbConfig = require('../config/database_config')

module.exports = () => {
    const userTableCreateQuery = `CREATE TABLE IF NOT EXISTS \`${dbConfig.User.tableName}\` ( \
                                    \`${dbConfig.User.attr.email}\` VARCHAR(255) NOT NULL, \
                                    \`${dbConfig.User.attr.password}\` VARCHAR(60) NOT NULL, \
                                    \`${dbConfig.User.attr.firstName}\` VARCHAR(45) NOT NULL, \
                                    \`${dbConfig.User.attr.lastName}\` VARCHAR(45) NOT NULL, \
                                    \`${dbConfig.User.attr.phone}\` VARCHAR(10) NOT NULL, \
                                    \`${dbConfig.User.attr.role}\` CHAR(3) NOT NULL, \
                                    PRIMARY KEY (\`${dbConfig.User.attr.email}\` ))`;
    db.execute(userTableCreateQuery).then((result) => {
        console.log(`Created ${dbConfig.User.tableName} table if it didn't exist.`);
    }).catch(err => {
        console.log(`Unable to create table ${dbConfig.User.tableName}`, '\n',err);
    })
};