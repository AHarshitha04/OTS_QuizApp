const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5001;
const path = require("path");
const imagesDirectory = path.join(__dirname, "uploads");
const db = require("./DataBase/db2");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(imagesDirectory));
app.use(cors());

//_______________________________________________________________________OTS_QUIZ_ADMIN_______________________________________________________

const Dashboard = require("./OTS_Quiz_Admin/Dashbord");
app.use("/Dashboard", Dashboard);

const ExamCreation = require("./OTS_Quiz_Admin/ExamCreation");
app.use("/ExamCreation", ExamCreation);

const CoureseCreation = require("./OTS_Quiz_Admin/CoureseCreation");
app.use("/CoureseCreation", CoureseCreation);

const InstructionCreation = require('./OTS_Quiz_Admin/InstructionCreation')
app.use("/InstructionCreation", InstructionCreation);


const TestCreation = require('./OTS_Quiz_Admin/TestCreation')
app.use("/TestCreation", TestCreation);

const DocumentUpload =require('./OTS_Quiz_Admin/DocumentUpload')
app.use("/DocumentUpload", DocumentUpload);

const ImageUpload =require('./OTS_Quiz_Admin/ImageUpload')
app.use("/ImageUpload", ImageUpload);
 
//_______________________________END__________________________________

//-----------------------------------------------ughomepage_banner_login_START--------------------------------------------------------------//

const ughomepage_banner_login = require("./Website_Admin/ughomepage_banner_login");
app.use("/ughomepage_banner_login", ughomepage_banner_login);

//-----------------------------------------------ughomepage_banner_login_END--------------------------------------------------------------//

//-----------------------------------------------OTS_QUIZ_APP_START--------------------------------------------------------------//

//================OTS_QUIZAPP_IMPORTS_START=================
const ExamPage = require("./OTS_QuizApp/ExamPage");
const CoursePage = require("./OTS_QuizApp/CoursePage");
const TestPage = require("./OTS_QuizApp/TestPage");
const InstructionPage = require("./OTS_QuizApp/InstructionPage");
const QuizPage = require("./OTS_QuizApp/QuizPage");
const TestResultPage = require("./OTS_QuizApp/TestResultPage");
//================OTS_QUIZAPP_IMPORTS_END==================

//================OTS_QUIZAPP_ROUTES_START==================
app.use("/ExamPage", ExamPage);
app.use("/CoursePage", CoursePage);
app.use("/TestPage", TestPage);
app.use("/InstructionPage", InstructionPage);
app.use("/QuizPage", QuizPage);
app.use("/TestResultPage", TestResultPage);
//================OTS_QUIZAPP_ROUTES_END===============

//-----------------------------------------------OTS_QUIZ_APP_START--------------------------------------------------------------//

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
