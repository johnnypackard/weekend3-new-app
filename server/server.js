// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const tasks = require( './routes/task.router' );

// database and mongoose
const DATABASE_URL = 'mongodb://localhost:27017/todo-app';
mongoose.connect( DATABASE_URL );
mongoose.connection.on('connected', () => {
 console.log('connected to Mongo on', DATABASE_URL );
});
mongoose.connection.on( 'error', ( error ) => {
    console.log( 'error connecting to Mongo', error );
});

// app uses
app.use( bodyParser.json() );
app.use( express.static( 'server/public' ) );
app.use( '/tasks', tasks );

// port
const PORT = process.env.PORT || 5000;
app.listen( PORT, () => {
    console.log( 'listening on port:', PORT );

})
