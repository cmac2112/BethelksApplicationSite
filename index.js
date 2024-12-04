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


  //custom middleware to protect routes and files, this will need to validate if a user is authorized
  //currently unchanged at the moment
  const validateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("missing token");
      return res.status(401).send("Missing token");
    }
    try {
      const userInfoResponse = await fetch(GOOGLE_USERINFO_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!userInfoResponse.ok) {
        return res.status(401).send("Invalid token");
      }
  
      const userInfo = await userInfoResponse.json();
      if (userInfo.hd !== "bethelks.edu") {
        return res.status(401).send("invalid email domain");
      }
    } catch (error) {
      console.log("error here");
      return res.status(401).send("unable to authenticate email domain");
    }
  
  
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
      );
  
      if (!response.ok) {
        console.log("invalid token, response failed");
        return res.status(401).send("Invalid token");
      }
  
      const tokenInfo = await response.json();
      try{
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      const userInfo = await userInfoResponse.json();
      console.log(userInfo)
      req.img = userInfo.picture
      req.name = userInfo.name
      req.userId = tokenInfo.sub; // Attach token info to the request object
      next(); // Proceed to the next middleware or route handler
  }catch(error){
    console.error("userInfo error", error);
    return res.status(402).send("failed to get user info")
  }
    } catch (error) {
      console.error("Token validation error:", error);
      return res.status(401).send("Invalid token");
    }
  };

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
app.get("/api/other", (req,res)=>{
  con.query(
    `SELECT * FROM jobs WHERE employment NOT IN ('faculty', 'staff')`,
    function(err, rows){
      if(err){
        console.error('error executing query');
        res.status(500).send('error executing query');
        return;
      }
      res.send(rows);
    }
  )
})
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
        res.send({"message":"no applications, or not found"});
        return;
      }
      res.send(rows);
    }
  );
});
//################################gets^##################################################

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
//########################puts^#############################################

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

//#############################posts^#####################################
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
//########################deletes#######################################


//#################################################################################################################\
//testing area
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
//##########################################################################################

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


// Serve static files from the React app
//build the app with `npm run build`, then serve files from this directory
app.use(express.static(path.join(__dirname, '/JobSite/dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Jobsite/dist', 'index.html'));
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
