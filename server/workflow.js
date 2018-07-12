// Get dependencies
import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/User';

// Initaite express app
const app = express();

// Get our API routes
import routes from './routes/routes';

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//mongooose connection to mongodb
mongoose.connect('mongodb://localhost/asteria');

//create a user if not already there
User.findOne({userId: 'asteria'}).exec((err,user) => {
  if(err) {
    console.log(err);
  }
  if(user == null) {
    let user = new User();
    user.userId= "asteria";
    user.password= "asteria";

    user.save((err, saveRes) =>  {
      if(err) {
        console.log(err);
      }
    });
  }
});

// Set our api routes
app.use('/', routes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..\\dist\\index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;