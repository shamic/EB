const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    password: db.STRING(200),
    name: {
        type: db.STRING(100),
        allowNull: true
    }
});
