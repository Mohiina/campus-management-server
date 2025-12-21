const { DataTypes } = require('sequelize');
const db = require('../index');

const Campus = db.define('campus', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
      
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
        'https://upload.wikimedia.org/wikipedia/commons/6/62/University_campus.jpg'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
        }
    },
    
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = Campus;
