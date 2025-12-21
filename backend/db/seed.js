const db = require('./index');           // db instance
const { Campus, Student } = require('./models'); // models

const seed = async () => {
  try {
    await db.sync({ force: true }); // clears db

    const campuses = await Campus.bulkCreate([
      { name: 'north campus', address: '123 north st', description: 'big campus' },
      { name: 'south campus', address: '456 south st', description: 'small campus' }
    ]);

    const students = await Student.bulkCreate([
      { firstName: 'alice', lastName: 'smith', email: 'alice@example.com', gpa: 3.9, campusId: campuses[0].id },
      { firstName: 'bob', lastName: 'johnson', email: 'bob@example.com', gpa: 3.2, campusId: campuses[1].id }
    ]);

    console.log('db seeded!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
