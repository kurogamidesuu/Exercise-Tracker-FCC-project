const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    count: Number,
    log: []
  }
);
let User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/users', function(req, res) {
  const username = req.body.username;
  let new_user = new User({username: username, count: 0});
  new_user.save();
  res.json(
    {
      username: new_user.username,
      _id: new_user.id
    }
  );
});

app.get('/api/users', async function(req, res) {
  const data = await User.find({}, 'username _id');
  res.json(data);
});

app.post('/api/users/:_id/exercises', async function (req, res) {
  const data = req.body;
  const id = req.params._id;
  const matchedUser = await User.findById({_id: id});

  const date = data.date ? new Date(data.date) : new Date();

  // log entry
  const logEntry = {
    description: data.description,
    duration: data.duration,
    date: date
  }

  matchedUser.log.push(logEntry);
  matchedUser.count++;
  matchedUser.save();

  res.json({
    username: matchedUser.username,
    description: data.description,
    duration: Number(data.duration),
    date: date.toDateString(),
    _id: matchedUser._id
  });
});

function formattedLog(log) {
  return {
    description: log.description,
    duration: Number(log.duration),
    date: new Date(log.date).toDateString()
  }
}

function showLogs(logs, from, to, limit) {
  if (!from && !to && !limit) {
    return logs;
  }

  let filteredLogs = logs;

  if (from) {
    const temp = filteredLogs.filter(log => {
      if (new Date(log.date) >= new Date(from)) {
        return true;
      }
    });
    filteredLogs = temp;
  }

  if (to) {
    const temp = filteredLogs.filter(log => {
      if (new Date(log.date) <= new Date(to)) {
        return true;
      }
    });
    filteredLogs = temp;
  }

  if (limit) {
    let count = limit;
    const temp = filteredLogs.filter(log => {
      if (count) {
        count--;
        return true;
      }
    });
    filteredLogs = temp;
  }

  return filteredLogs;
}

app.get('/api/users/:_id/logs', async function(req, res) {
  const id = req.params._id;
  const matchedUser = await User.findById({_id: id});

  const from = req.query.from;
  const to = req.query.to;
  const limit = parseInt(req.query.limit);

  let logs = showLogs(matchedUser.log, from, to, limit);
  logs = logs.map(log => formattedLog(log));

  res.json({
    _id: matchedUser._id,
    username: matchedUser.username,
    count: matchedUser.count,
    log: logs
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
