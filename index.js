require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
const cors = require("cors");
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

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

app.put("/api/newjob/:id", (req, res)=>{
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
    jobtitle
  ];
  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(`Error updating job`, err);
      res.status(500).send('Error updating job');
      return;
    }
    res.send('Job updated successfully');
  });
});

app.post("/api/newjob", (req, res) => {
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
      return res.status(500).send("error inserting job");
    }
    res.send("job posted");
  });
});

app.post("/api/multer", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("no file uploaded");
  }
  const file = req.file;
  const sql = `INSERT INTO testFile (name, data, mime_type) VALUES (?, ?, ?)`;
  const values = [file.originalname, file.buffer, file.mimetype];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.error(`error inserting file`, err);
      return res.status(500).send("error inserting file");
    }
    res.send("file uploaded successfully");
  });
});

//dont do this, storing files to mysql is dumb, just testing file upload with multer
app.get("/api/file", (req, res) => {
  const sql = `SELECT * from testFile ORDER BY id DESC LIMIT 1`;
  con.query(sql, (err, results) => {
    if (err) {
      console.error(`error fetching`, err);
      return res.status(500).send("error fetching file");
    }
    const file = results[0];
    res.setHeader("Content-Disposition", `attachment; filename=${file.name}`);
    res.setHeader("Content-Type", file.mime_type);
    res.send(file.data);
  });
});


//support files later
app.post("/api/apply", upload.none(), (req, res) => {
    console.log(req.method + " request for " + req.url);
    console.log("received data:", req.body);
    const body = req.body;
    const pastEmployment = JSON.parse(req.body.pastEmployment)
    console.log('past employment', pastEmployment)
    const sql = `INSERT INTO jobApplications(hearAbout, position, workTime, start, name,
    curAddress, permAddress, contactInfo, preferredContact, authorized, sponsorship, everApplied, everEmployed,
    related, pastEmployment, highschool, university, gradUniversity, other, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?)`;
    const vals = [body.hearAbout, body.position, body.workTime, body.start, body.name,
      body.curAddress, body.permAddress, body.contactInfo, body.preferredContact, body.authorized,
      body.sponsorship, body.everApplied, body.everEmployed, body.related, body.pastEmployment, body.highschool,
      body.university, body.gradUniversity, body.other, body.skills
    ];
    console.log(vals);
    con.query(sql, vals, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("error posting application");
      }
      res.send("application accepted successfully");
      console.log(result)
    });
  });

app.delete("/api/applications/delete/:id", (req, res) =>{
    const { id } = req.params;
    const intId = parseInt(id, 10)
    console.log(req.method + " request for " + req.url + " with id " + id);
    con.query(`DELETE from jobApplications WHERE id = ?`,
        [intId],
        function(err, rows){
            if(err){
                console.error("error executing query", err);
                res.status(500).json({message: "error executing query"});
                return;
            }
            res.status(200).json({message :"deleted sucessfully"})

        }
    )
})
app.delete("/api/jobs/delete/:id", (req, res) =>{
    const { id } = req.params;
    const intId = parseInt(id, 10)
    console.log(req.method + " request for " + req.url + " with id " + id);
    con.query(`DELETE from jobs WHERE id = ?`,
        [intId],
        function(err, rows){
            if(err){
                console.error("error executing query", err);
                res.status(500).json({message: "error executing query"});
                return;
            }
            res.status(200).json({message :"deleted sucessfully"})

        }
    )
})
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
        res.send("no applications, or not found");
        return;
      }
      res.send(rows);
    }
  );
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/JobSite/dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Jobsite/dist', 'index.html'));
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});

//traefik
//server and site should be one thing on same port but traefik figures it out and sends requests to server 
//another docker traefik image reverse proxy  