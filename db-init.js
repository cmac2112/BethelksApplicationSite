require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const connectionConfig = {
  host: process.env.DB_HOST || "Cmac24",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_PASSWORD,
  database: process.env.DB_DATABASE || "jobSite",
};

const con = mysql.createConnection(connectionConfig);

con.connect(function (err) {
  if (err) throw err;
  console.log("connected to mysql, database:" + connectionConfig.database);
});
con.query("DROP DATABASE IF EXISTS jobSite", function (err, result) {
  if (err) throw err;
  console.log("Database dropped");
});
con.query("CREATE DATABASE IF NOT EXISTS jobSite", function (err, result) {
  if (err) throw err;
  console.log("Database created");
});
con.query("USE jobSite", function (err, result) {
  if (err) throw err;
  console.log("Using jobSite database");
});

con.query(
  `
    CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        employment VARCHAR(255),
        description LONGTEXT,
        department VARCHAR(255),
        classification VARCHAR(255),
        info LONGTEXT
    )
`,
  function (err, result) {
    if (err) throw err;
    console.log("Table created");
  }
);
con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Data Analyst', 'faculty', 'Analyzes data to provide insights', 'Data Science', 'Analyst', '<h2>Data Analysis</h2><p>Analyzing data to provide insights.</p><script>alert("xss detected")</script>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Project Manager', 'staff', 'Manages projects and coordinates teams', 'Management', 'Manager', '<h3>Project Management</h3><ul><li>Coordinate teams</li><li>Manage projects</li></ul>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('UX Designer', 'staff', 'Designs user interfaces and experiences', 'Design', 'Designer', '<h3>UX Design</h3><p>Designing user interfaces and experiences.</p><img src="https://example.com/image.jpg" alt="Design Image">')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Network Engineer', 'faculty', 'Maintains and troubleshoots network infrastructure', 'IT', 'Engineer', '<h3>Network Engineering</h3><p>Maintaining and troubleshooting network infrastructure.</p><a href="https://example.com">Learn more</a>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Marketing Specialist', 'staff', 'Develops marketing strategies and campaigns', 'Marketing', 'Specialist', '<h3>Marketing Strategies</h3><p>Developing marketing strategies and campaigns.</p><blockquote>Marketing is key to success.</blockquote>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('HR Coordinator', 'faculty', 'Coordinates HR activities and processes', 'Human Resources', 'Coordinator', '<h3>HR Coordination</h3><p>Coordinating HR activities and processes.</p><table><tr><td>Policy</td><td>Procedure</td></tr><tr><td>Recruitment</td><td>Onboarding</td></tr></table>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Financial Analyst', 'staff', 'Analyzes financial data and prepares reports', 'Finance', 'Analyst', '<h3>Financial Analysis</h3><p>Analyzing financial data and preparing reports.</p><code>SELECT * FROM financial_data;</code>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Content Writer', 'staff', 'Writes and edits content for various platforms', 'Content', 'Writer', '<h3>Content Writing</h3><p>Writing and editing content for various platforms.</p><pre>Content is king.</pre>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);

con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Customer Support Representative', 'faculty', 'Provides support to customers and resolves issues', 'Customer Support', 'Representative', '<h3>Customer Support</h3><p>Providing support to customers and resolving issues.</p><strong>Customer satisfaction is our priority.</strong>')`,
  function (err, result) {
    if (err) throw err;
    console.log("Row inserted");
  }
);
con.query(
  `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('TEST JOB FOR FORMATTING', 'faculty', 'random description here', 'biology', 'full-time',
   '<h1 class="border-b-2">Heading 1</h1><p>Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
     labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut
       aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse
         cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
           sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p><h1 class="border-b-2">Heading 2</h1><p>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
             dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
               Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h2>Heading 2</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                   Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h3>Heading 3</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>list 1</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>list 2</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>list 3</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>list 4</li></ol>')`,
  function (err, result) {
    if (err) throw err;
    console.log("row inserted");
  }
);
con.query("SELECT * FROM jobs", function (err, rows) {
  if (err) throw err;
  console.log("Data received from Db:\n");
  console.log(rows);
});
//missing file areas for now after ever employed nail down what is needed
con.query(`CREATE TABLE IF NOT EXISTS jobApplications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hearAbout VARCHAR(255),
    position VARCHAR(255),
    workTime VARCHAR(255),
    start VARCHAR(255),
    name VARCHAR(255),
    curAddress VARCHAR(255),
    permAddress VARCHAR(255),
    contactInfo VARCHAR(255),
    preferredContact VARCHAR(255),
    authorized VARCHAR(255),
    sponsorship VARCHAR(255),
    everApplied VARCHAR(255),
    everEmployed VARCHAR(255),
    related VARCHAR(255),
    pastEmployment LONGTEXT,
    highschool VARCHAR(255),
    university VARCHAR(255),
    gradUniversity VARCHAR(255),
    other VARCHAR(255),
    skills LONGTEXT
)`);
con.query(
  `INSERT INTO jobApplications (
      hearAbout, position, workTime, start, name, curAddress, permAddress, contactInfo, preferredContact, authorized, sponsorship, everApplied, everEmployed, related, pastEmployment, highschool, university, gradUniversity, other, skills
  ) VALUES
  ('Online', 'Data Analyst', '{"fullTime":true,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}', '2023-01-01', 'John Doe', '{"address":"123 Main St","city":"Anytown","state":"USA","zip":"12345"}', '{"address":"456 Elm St","city":"Othertown","state":"USA","zip":"67890"}', '{"phone":"+1234567890","email":"john.doe@example.com"}', 'Email', 'Yes', 'No', 'No', 'Yes', 'Jane Doe', '[{"employer1":{"name":"ABC Corp","position":"Developer","start":"2020-01-01","end":"2022-01-01","duties":"Developed software"}}]', '{"name":"Anytown High School","address":"123 High St","diploma":"High School Diploma"}', '{"name":"State University","address":"456 College Ave","courseStudy":"Computer Science","diploma":"BSc"}', '{"name":"Tech University","address":"789 Tech Rd","courseStudy":"Software Engineering","diploma":"MSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'JavaScript, React, Node.js'),
  ('Referral', 'Data Analyst', '{"fullTime":false,"partTime":true,"temporary":false,"evenings":false,"weekends":false,"nights":false}', '2023-02-01', 'Alice Smith', '{"address":"789 Oak St","city":"Sometown","state":"USA","zip":"23456"}', '{"address":"101 Pine St","city":"Anothertown","state":"USA","zip":"34567"}', '{"phone":"+2345678901","email":"alice.smith@example.com"}', 'Phone', 'Yes', 'Yes', 'Yes', 'No', 'Bob Smith', '[{"employer1":{"name":"XYZ Inc","position":"Analyst","start":"2019-01-01","end":"2021-01-01","duties":"Analyzed data"}}]', '{"name":"Sometown High School","address":"234 High St","diploma":"High School Diploma"}', '{"name":"City University","address":"567 College Ave","courseStudy":"Data Science","diploma":"BSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'Python, SQL, Excel'),
  ('Job Fair', 'HR Coordinator', '{"fullTime":false,"partTime":false,"temporary":true,"evenings":false,"weekends":false,"nights":false}', '2023-03-01', 'Bob Johnson', '{"address":"234 Maple St","city":"Yourtown","state":"USA","zip":"45678"}', '{"address":"567 Birch St","city":"Thistown","state":"USA","zip":"56789"}', '{"phone":"+3456789012","email":"bob.johnson@example.com"}', 'Phone', 'No', 'No', 'No', 'Yes', 'Alice Johnson', '[{"employer1":{"name":"LMN LLC","position":"Manager","start":"2018-01-01","end":"2020-01-01","duties":"Managed projects"}}]', '{"name":"Yourtown High School","address":"345 High St","diploma":"High School Diploma"}', '{"name":"Regional University","address":"678 College Ave","courseStudy":"Project Management","diploma":"BSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'Project Management, Agile, Scrum'),
  ('Online', 'Project Manager', '{"fullTime":true,"partTime":false,"temporary":false,"evenings":false,"weekends":false,"nights":false}', '2023-04-01', 'Jane Doe', '{"address":"321 Main St","city":"Anytown","state":"USA","zip":"12345"}', '{"address":"654 Elm St","city":"Othertown","state":"USA","zip":"67890"}', '{"phone":"+1234567890","email":"jane.doe@example.com"}', 'Email', 'Yes', 'No', 'No', 'Yes', 'John Doe', '[{"employer1":{"name":"DEF Corp","position":"Developer","start":"2021-01-01","end":"2023-01-01","duties":"Developed software"}}]', '{"name":"Anytown High School","address":"123 High St","diploma":"High School Diploma"}', '{"name":"State University","address":"456 College Ave","courseStudy":"Computer Science","diploma":"BSc"}', '{"name":"Tech University","address":"789 Tech Rd","courseStudy":"Software Engineering","diploma":"MSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'JavaScript, React, Node.js'),
  ('Referral', 'Data Analyst', '{"fullTime":false,"partTime":true,"temporary":false,"evenings":false,"weekends":false,"nights":false}', '2023-05-01', 'Bob Smith', '{"address":"987 Oak St","city":"Sometown","state":"USA","zip":"23456"}', '{"address":"210 Pine St","city":"Anothertown","state":"USA","zip":"34567"}', '{"phone":"+2345678901","email":"bob.smith@example.com"}', 'Phone', 'Yes', 'Yes', 'Yes', 'No', 'Alice Smith', '[{"employer1":{"name":"UVW Inc","position":"Analyst","start":"2020-01-01","end":"2022-01-01","duties":"Analyzed data"}}]', '{"name":"Sometown High School","address":"234 High St","diploma":"High School Diploma"}', '{"name":"City University","address":"567 College Ave","courseStudy":"Data Science","diploma":"BSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'Python, SQL, Excel'),
  ('Job Fair', 'Project Manager', '{"fullTime":false,"partTime":false,"temporary":true,"evenings":false,"weekends":false,"nights":false}', '2023-06-01', 'Alice Johnson', '{"address":"432 Maple St","city":"Yourtown","state":"USA","zip":"45678"}', '{"address":"765 Birch St","city":"Thistown","state":"USA","zip":"56789"}', '{"phone":"+3456789012","email":"alice.johnson@example.com"}', 'Phone', 'No', 'No', 'No', 'Yes', 'Bob Johnson', '[{"employer1":{"name":"OPQ LLC","position":"Manager","start":"2019-01-01","end":"2021-01-01","duties":"Managed projects"}}]', '{"name":"Yourtown High School","address":"345 High St","diploma":"High School Diploma"}', '{"name":"Regional University","address":"678 College Ave","courseStudy":"Project Management","diploma":"BSc"}', '{"name":"None","address":"","courseStudy":"","diploma":""}', '{"name":"None","address":"","courseStudy":"","diploma":""}', 'Project Management, Agile, Scrum');`,
  function (err, result) {
    if (err) throw err;
    console.log("Data inserted successfully");
  }
);
con.query("SELECT * FROM jobApplications", function (err, rows) {
  if (err) throw err;
  console.log("Data received from Db:\n");
  console.log(rows);
});

con.query(
  `CREATE TABLE IF NOT EXISTS authorizedUsers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255)
  )`,
  function (err, rows) {
    if (err) throw err;
  }
);

con.query(
  `INSERT INTO authorizedUsers (email) VALUES ('cadenamcarthur@bethelks.edu'), ('dpenner@bethelks.edu')`,
  function (err, rows) {
    if (err) throw err;
    console.log("data recieved");
    console.log(rows);
  }
);

con.end();
