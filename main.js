const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./router');

app.use(cors())

// Make web client angular router on host
app.use(express.static(__dirname + '/dist'));

// Use router
app.use('/api', router)

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('listening...');