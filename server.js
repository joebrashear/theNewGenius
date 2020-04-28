const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// mongodb+srv://joebrashear:MerryChristmas@cluster0-k53pf.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://joebrashear:MerryChristmas@cluster0-k53pf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',  () =>  {
    console.log('Mongoose is connected!!!!');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname, "client", "build", "index.html"));
  });

app.listen(PORT, console.log(`Server is starting at ${PORT}`));