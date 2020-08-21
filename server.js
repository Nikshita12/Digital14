const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connecting database
connectDB();

// initializing middleware
app.use( express.json({ extended : false}));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
