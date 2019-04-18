module.exports = {
    databaseName: 'hotelSystem',
    User : {
        tableName: 'users',
        attr: {
            email: 'Email',
            password: 'Password',
            firstName: 'First Name',
            lastName: 'Last Name',
            phone: 'Contact No.',
            role: 'Role'
        }
    },
    Room : {
        name: 'rooms'
    }
}