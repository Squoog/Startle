const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const multer = require("multer"); //Multer middleware for file uploading
const cors = require("cors");
const fs = require("fs");
const sendTwilio = require("./twilio/send_sms")
const alarmItems = require("./data/mockAlarmItemData");
const soundsData = require("./data/mockSoundData");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Multer storage
const DIR = "./public/audio" // Sound data file storage - must be in public for current acceess methods
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("file before rename: ", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAudio = multer({storage: audioStorage});



// DB Query test router
const usersRouter = require('./routes/users');
const contactsRouter = require("./routes/contacts");
// DB query test app.use
app.use('/users', usersRouter);
app.use("/contacts", contactsRouter);

// first attempt at login routes
app.use("/login", (req, res) => {
  res.send({
    token: "test123",
  });
});


// eventually write db queries in functions below, i think?

// const getSomeDataExample = () => {
//   return db.query("SELECT * FROM data")
// }

// Multer upload test
app.post("/upload", uploadAudio.single("sound"), (req, res) => {
  res.send(req.file.filename);
  console.log(req.file.filename);

  fs.readdir(DIR, (err, files) => {
    files.forEach(file => {
      console.log("files: ", file);
    })
  })
});

const getTimes = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.time] = 0));

  const times = Object.keys(alarmsBuffer);
  return Promise.resolve(times);
};

const getContacts = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.contact] = 0));

  const contacts = Object.keys(alarmsBuffer);
  return Promise.resolve(contacts);
};

const getSounds = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.sound] = 0));

  const sounds = Object.keys(alarmsBuffer);
  return Promise.resolve(sounds);
};



const getUsers = () => {
  const alarmsBuffer = {};
  alarmItems.forEach((alarmItem) => (alarmsBuffer[alarmItem.user] = 0));

  const users = Object.keys(alarmsBuffer);
  return Promise.resolve(users);
};

const getMockSounds = () => {
  return Promise.resolve(soundsData);
};

// functions to handle axios posts coming from front end

const addTime = (time) => {
  alarmItems.push(time);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

const addAlarmItem = (newAlarmItem) => {
  alarmItems.push(newAlarmItem);

  return Promise.resolve("ok"); // if this was DB call, return the created id
};

const addNewSound = (newSound) => {
  soundsData.push(newSound);

  return Promise.resolve("ok sound");
}

app.post("/api/v1/sendSMS", (req, res) => {
  console.log(req.body.contactName);
  // sendTwilio(req.body.phoneNumber)
});

///Returns full item for each alarm based on user_email

const getAlarmItems = (user_email) => {
  
  const sortedByUser = alarmItems.filter(function (el) {
    return el.user_email == user_email;
  });

  return Promise.resolve(sortedByUser);
};

const getAlarmItemsLastId = () => {

  const lastId = alarmItems.length

  return Promise.resolve(lastId)
}


app.get("/api/v1/alarmItems/:id", (req, res) => {
  getAlarmItems(req.params.id).then((alarmItems) => res.json(alarmItems));
});

app.get("/api/v1/alarmItemLastId", (req, res) => (
  getAlarmItemsLastId().then((lastId) => res.json(lastId))

))

app.get("/api/v1/users", (req, res) => {
  getUsers().then((users) => res.json(users));
});

app.get("/api/v1/times", (req, res) => {
  getTimes().then((times) => res.json(times));
});

app.get("/api/v1/contacts", (req, res) => {
  getContacts().then((contacts) => res.json(contacts));
});

app.get("/api/v1/sounds", (req, res) => {
  getSounds().then((Sounds) => res.json(Sounds));
});

// extra route needed for testing sound without breaking alarms
app.get("/api/v2/sounds", (req, res) => {
  getMockSounds().then((sounds) => res.json(sounds));
});

 // extra route needed for testing sounds without breaking alarms
app.post("/api/v2/sounds", (req, res) => {
  const { newSound } = req.body;
  console.log(req.body);
  addNewSound(newSound).then((data) => res.send(data));
});




app.post("/api/v1/alarmItems", (req, res) => {
  const { newAlarmItem } = req.body;
  addAlarmItem(newAlarmItem).then((data) => res.send(data));
});

app.post("/api/v1/times", (req, res) => {
  const { time } = req.body;
  addTime(time).then((data) => res.send(data));
});
module.exports = app;
