require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require('fs')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

const connectionConfig = {
  host: process.env.DB_HOST || "Cmac24",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_PASSWORD,
  database: process.env.DB_DATABASE || "jobSite",
};
//no data in database right now
let con;
function connectWithRetry() {
  con = mysql.createConnection(connectionConfig);
  con.connect(function (err) {
    console.log("Connecting to MySQL");
    if (err) {
      console.log("error retrying");
      console.log("error when connecting to db:", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to MySQL");
    }

    con.query("SHOW TABLES", function (err, rows) {
      if (err) {
        console.log("error in query");
        console.log("error in query:", err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      }
      console.log("Data received from Db:\n");
      console.log(rows);
    });
  });

  con.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connectWithRetry(); // Reconnect on connection loss
    } else {
      throw err;
    }
  });
}
connectWithRetry();
//authentication

//custom middleware to protect routes and files, this will need to validate if a user is authorized
const validateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  let userInfo;
  if (!token) {
    console.log("missing token");
    return res.status(401).send({ error: "Missing token" });
  }
  try {
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      return res.status(401).send({ error: "Invalid token" });
    }

    userInfo = await userInfoResponse.json();
  } catch (error) {
    console.log("error here");
    return res
      .status(401)
      .send({ error: "unable to authenticate user" });
  }
  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
    );

    if (!response.ok) {
      console.log("invalid token, response failed");
      return res.status(401).send({ message: "Invalid token" });
    }

    const tokenInfo = await response.json();
    console.log(tokenInfo);
    console.log(userInfo);

    const email = userInfo.email;
    const sql = `SELECT * FROM authorizedusers where email = ?`;
    con.query(sql, [email], function (err, result) {
      console.log(req.method + " authorizing user " + email);
      if (err) {
        console.log("error authenticating user");
        res.status(500).send({ error: "could not authenticate" });
      }
      if (result.length > 0) {
        console.log("user has been authenticated");
        next();
      } else {
        console.log("error");
        res.status(401).send({ "error": "user is not authenticated" });
      }
    });

    // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("userInfo error", error);
    return res.status(402).send("failed to get user info");
  }
};
app.get("/api/staff", (req, res, next) => {
  con.query(
    `SELECT * from jobs WHERE employment = 'staff'`,
    function (err, rows) {
      console.log(req.method + " request for " + req.url);
      if (err) {
        console.error("Error executing query ", err);
        res.status(500).send("Error executing query");
        return;
      }
      res.send(rows);
    }
  );
});
app.get("/api/faculty", (req, res, next) => {
  console.log(req.method + " request for " + req.url);
  con.query(
    `SELECT * from jobs WHERE employment = 'faculty'`,
    function (err, rows) {
      if (err) {
        console.error("Error executing query ", err);
        res.status(500).send("Error executing query");
        return;
      }
      res.send(rows);
    }
  );
});
app.get("/api/other", (req, res) => {
  con.query(
    `SELECT * FROM jobs WHERE employment NOT IN ('faculty', 'staff')`,
    function (err, rows) {
      if (err) {
        console.error("error executing query");
        res.status(500).send("error executing query");
        return;
      }
      res.send(rows);
    }
  );
});
app.get("/api/jobs", (req, res) => {
  console.log(req.method + " request for " + req.url);
  con.query(`SELECT * FROM jobs`, function (err, rows) {
    if (err) {
      console.error("error executing query", err);
      res.status(500).send("error executing query");
      return;
    }
    res.send(rows);
  });
});
app.get("/api/jobs/:id", (req, res) => {
  console.log(req.method + " request for " + req.url);
  const { id } = req.params;
  con.query(`SELECT * FROM jobs WHERE id = ?`, [id], function (err, rows) {
    if (err) {
      console.error("error executing query", err);
      res.status(500).send("error executing query");
      return;
    }
    res.send(rows);
  });
});

app.get("/api/applications/:title", (req, res) => {
  const { title } = req.params;
  console.log(req.method + " request for " + req.url + " with title " + title);
  con.query(
    `SELECT * from jobApplications WHERE position = ?`,
    [title],
    function (err, rows) {
      if (err) {
        console.error("error executing query", err);
        res.status(500).send("error executing query");
        return;
      }
      if (rows.length === 0) {
        res.send({ message: "no applications, or not found" });
        return;
      }
      res.send(rows);
    }
  );
});
//################################gets^##################################################

app.put("/api/newjob/:id", validateToken, (req, res) => {
  const jobtitle = req.params.id;
  const body = req.body;
  const sql = `UPDATE jobs SET title = ?, employment = ?, description = ?, department = ?, classification = ?, info = ? WHERE id = ?`;
  const values = [
    body.title,
    body.employment,
    body.description,
    body.department,
    body.classification,
    body.info,
    jobtitle,
  ];
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(`Error updating job`, err);
      res.status(500).send({ error: "Error updating job" });
      return;
    }
    res.send({ success: "Job updated successfully" });
  });
});
//########################puts^#############################################

app.post("/api/newjob", validateToken, (req, res) => {
  console.log(req.method + " request for " + req.url);
  const body = req.body;
  const sql = `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    body.title,
    body.employment,
    body.description,
    body.department,
    body.classification,
    body.info,
  ];
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(`error inserting values`, err);
      return res.status(500).send({ error: "error inserting job" });
    }
    res.send("job posted");
  });
});

//support files later
app.post("/api/apply", upload.any(), (req, res) => {
  console.log(req.method + " request for " + req.url);
  //console.log("received data:", req.body);
  const body = req.body;
  
  let resume, coverLetter, references, statementOfTeach, diversityStatement, graduateTranscript, performanceRec
  req.files.forEach(file => {
    switch (file.fieldname) {
      case 'resume':
        resume = file.filename;
        break;
      case 'coverLetter':
        coverLetter = file.filename;
        break;
      case 'references':
        references = file.filename;
        break;
      case 'statementOfTeach':
        statementOfTeach = file.filename;
        break;
      case 'diversityStatement':
        diversityStatement = file.filename;
        break;
      case 'graduateTranscript':
        graduateTranscript = file.filename;
        break;
      case 'performanceRec':
        performanceRec = file.filename;
        break;
      case 'otherFile':
        otherFile = file.filename;
        break;
      default:
        console.log(`Unknown file fieldname: ${file.fieldname}`);
    }
  });
  const sql = `INSERT INTO jobApplications(hearAbout, position, jobId, workTime, start, name,
    curAddress, permAddress, contactInfo, preferredContact, authorized, sponsorship, everApplied, everEmployed,
    related, pastEmployment, highschool, university, gradUniversity, other, skills, resumeURL, coverLetterURL, referencesURL, statementOfTeachingURL, diversityStatementURL, graduateTranscriptURL, performanceRecordingURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const vals = [
    body.hearAbout,
    body.position,
    body.positionId,
    body.workTime,
    body.start,
    body.name,
    body.curAddress,
    body.permAddress,
    body.contactInfo,
    body.preferredContact,
    body.authorized,
    body.sponsorship,
    body.everApplied,
    body.everEmployed,
    body.related,
    body.pastEmployment,
    body.highschool,
    body.university,
    body.gradUniversity,
    body.other,
    body.skills,
    resume,
    coverLetter,
    references,
    statementOfTeach,
    diversityStatement,
    graduateTranscript,
    performanceRec
  ];
  console.log(vals);
  con.query(sql, vals, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("error posting application");
    }
    res.send("application accepted successfully");
    console.log(result);
  });
});

app.post("/api/authorized/add", validateToken, (req, res)=>{
  console.log(req.method + " request for " + req.url);

  const newUser = req.body.email
  const sql = `INSERT INTO authorizedusers (email) VALUES (?)`
  con.query(sql, [newUser], function(err){
    if(err){
      console.error('error inserting new authorized user', err)
      res.status(500).send({"error":"internal server error"})
      return;
    }
    res.status(200).send({"message":"user inserted successfully"})

  })
})

//#############################posts^#####################################

app.delete("/api/authorized/delete/:email", validateToken, (req, res)=>{
  const { email } = req.params;
  console.log(req.method + " request for " + req.url + " with email " + email)
  //ensure this operation will not make authorized users fall below 2 users
  con.query(`SELECT * FROM authorizedusers`, function(err, rows){
    if(err){
      console.error('error selecting authorized users', err)
      res.status(500).json({error:"error selecting authorized users"})
    }
    if(rows.length <= 2){
      res.status(401).json({error:"there must be 2 authorized users"})
      return;
    }
    con.query(`DELETE FROM authorizedusers WHERE email = ?`, [email], function(err, result){
      if(err){
        console.error('error deleting authorized user');
        res.status(500).send({"error":"could not delete user"})
        return;
      }
      res.status(200).send({"success":"user deleted"})
    })

  })
})

app.delete("/api/applications/delete/:id", validateToken, (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id, 10);
  console.log(req.method + " request for " + req.url + " with id " + id);
  const getFileNamesSql = `SELECT resumeURL, coverLetterURL, referencesURL, statementOfTeachingURL, diversityStatementURL, graduateTranscriptURL, performanceRecordingURL FROM jobApplications WHERE id = ?`;
  con.query(
    getFileNamesSql,
    [intId],
    function (err, rows) {
      if (err) {
        console.error("error execcuting query", err);
        return res.status(500).send({ "message": "error executing query" });
      }
      if(rows.length === 0){
        return res.status(404).send({"message":"application not found"})
      }
      const files = rows[0]

      Object.values(files).forEach((filename) =>{
        if(filename){
          const filePath = path.join(__dirname, 'upload', filename);
          fs.unlink(filePath, (err) =>{
           if(err){
              console.error(`error deleting file ${filename}`, err)
            }else{
              console.log(`file ${filename} deleted successfully`)
            }
          })
        }
      })

      const deleteSql = `DELETE FROM jobapplications WHERE id = ?`
      con.query(deleteSql, [intId], function(err, result){
        if(err){
          res.status(500).send({"error":"internal server error"})
          return;
        }
        res.status(201).send({"message":"job application and related files deleted sucessfully"})
        

      })
    }
  );
});
app.delete("/api/jobs/delete/:id", validateToken, (req, res) => {
  const { id } = req.params;
  const intId = parseInt(id, 10);
  console.log(req.method + " request for " + req.url + " with id " + id);
  con.query(`SELECT resumeURL, coverLetterURL, referencesURL, statementOfTeachingURL, diversityStatementURL, graduateTranscriptURL, performanceRecordingURL FROM jobapplications where jobId = ?`, [intId], function(err, rows){
    if(err){
      console.error('error selecting job applications', err);
      res.status(500).send({"error":"error selecting to delete related job applications"})
      return
    }
    //needs to be a foreach for each row, query the db, select the filenames, delete them
    rows.forEach(application => {
      const fileFields = ['resumeURL', 'coverLetterURL', 'referencesURL', 'statementOfTeachingURL', 'diversityStatementURL', 'graduateTranscriptURL', 'performanceRecordingURL'];
      fileFields.forEach(field => {
        const filePath = application[field] ? path.join(__dirname, 'upload', application[field]) : null;
        if(filePath){
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`error deleting file ${filePath}`, err);
          
          }
        });
      }
      });
    });
    
    con.query(`DELETE FROM jobapplications WHERE jobId = ?`, [intId], function(err, result){
      if(err){
        console.error("error deleting job applications");
        res.status(500).send({"error":"error deleting job applications"})
        return
      }
      console.log('related application deleted')
    })

    con.query(`DELETE FROM jobs where id = ?`, [intId], function(err, result){
      if(err){
        console.error('error deleting job')
        res.status(500).send({"error":"error deleting job"})
        return
      }
      res.status(200).send({"message":"deleted successfully"})
    })
  })
});
//########################deletes#######################################

//Authorization
app.get("/api/authorized/:email", (req, res) => {
  const { email } = req.params;
  console.log(req.method + " request for " + req.url);

  const sql = `SELECT * FROM authorizedusers WHERE email = ?`;
  con.query(sql, [email], function (err, results) {
    if (err) {
      console.error(`Error fetching authorized user:`, err);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (results.length > 0) {
      // User is authorized
      res.status(200).send({ message: "User is authorized" });
    } else {
      // User is not authorized
      res.status(403).send({ message: "You are not authorized" });
    }
  });
});

app.get("/api/authorized", validateToken, (req, res) =>{
  console.log(req.method + " reqest for " + req.url);
  const sql = `SELECT * FROM authorizedusers`;
  con.query(sql, function(err, result){
    if(err){
      console.error('error fetching authorized users', err);
      return res.status(500).send({"error":"internal server error"})
    }
    res.send(result)
  })
})
//validate users trying to access files
app.get('/upload/:filename', validateToken, async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'upload', filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
    res.status(201).send("file download success")
  });
});

// Serve static files from the React app
//build the app with `npm run build`, then serve files from this directory
app.use(express.static(path.join(__dirname, "/JobSite/dist")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/Jobsite/dist", "index.html"));
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
