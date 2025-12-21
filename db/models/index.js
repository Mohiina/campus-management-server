const db = require('../index');   
const Campus = require('./Campus');
const Student = require('./Student');

Campus.hasMany(Student, { foreignKey: 'campusId' });
Student.belongsTo(Campus, { foreignKey: 'campusId' });

module.exports = {
    db,
    Campus,
    Student
  };
  
