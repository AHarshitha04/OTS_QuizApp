const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const path = require('path');
const imagesDirectory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(imagesDirectory));
const db = require('./DataBase/db2');
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

//_______________________________________________________________________OTS_QUIZ_ADMIN_______________________________________________________

const Dashboard = require('./OTS_Quiz_Admin/Dashbord')
app.use('/Dashboard', Dashboard)

const ExamCreation = require('./OTS_Quiz_Admin/ExamCreation')
app.use('/ExamCreation', ExamCreation)

const CoureseCreation=require("./OTS_Quiz_Admin/CoureseCreation")
app.use('/CoureseCreation',CoureseCreation)
app.use('/InstructionCreation',InstructionCreation)
app.use('/TestCreation',TestCreation)
app.use('/DocumentUpload',DocumentUpload)
app.use('/ImageUpload',ImeageUpload)



//_______________________________END__________________________________

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });