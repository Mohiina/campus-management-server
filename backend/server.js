const express = require('express');
const cors = require('cors');   
const app = express();
const apiRoutes = require('./api');
const db = require('./db');

app.use(cors());  
app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;



db.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
