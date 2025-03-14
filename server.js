const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB)
.then(()=>{
  console.log('MongoDB connected');
}).catch((error)=>{
  console.error('MongoDB connection error:', error);  // Log detailed error
});

const PORT = process.env.PORT || 3000;

app.listen( PORT,'0.0.0.0',()=>{
   console.log(`Server is Running On Port ${PORT}`);
}
);






// const app = require('./app');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Set up HTTP server with Socket.IO
// const http = require('http').createServer(app);
// const io = require('socket.io')(http); // Attach Socket.IO to the HTTP server

// // MongoDB connection
// mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');

//     // Watch for database changes using change streams
//     const db = mongoose.connection;
//     const changeStream = db.collection('employees').watch(); // Replace 'employees' with your collection

//     // When a change occurs, emit an event via Socket.IO
//     changeStream.on('change', (change) => {
//       console.log('Database change detected:', change);
//       io.emit('dbChange', change); // Broadcast change to all connected clients
//     });
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);  // Log detailed error
//   });

// // Set up port and server listener
// const PORT = process.env.PORT || 3000;
// http.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is Running On Port ${PORT}`);
// });