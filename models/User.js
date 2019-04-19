var db = require('../util/database');
var dbConfig = require('../config/database_config');

module.exports = class User {
    constructor(email, password, firstName, lastName, phone, role){
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
    }
    save(){
        return db.execute(`INSERT INTO \
        \`${dbConfig.User.tableName}\` (\`${dbConfig.User.attr.email}\` , \`${dbConfig.User.attr.password}\`,\
            \`${dbConfig.User.attr.firstName}\` , \`${dbConfig.User.attr.lastName}\` , \`${dbConfig.User.attr.phone}\` ,\
            \`${dbConfig.User.attr.role}\`) values (?,?,?,?,?,?)`, 
        [this.email, this.password, this.firstName, this.lastName, this.phone, this.role]);
    }
    static findByEmail(email){
        return db.execute(`SELECT * FROM \`${dbConfig.User.tableName}\` WHERE \`${dbConfig.User.attr.email}\` = ?`, [email]);
    }
}