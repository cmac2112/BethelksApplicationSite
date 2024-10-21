require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const connectionConfig = {
    host: process.env.DB_HOST || 'Cmac24',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || DB_USER,
    password: process.env.DB_PASSWORD || DB_PASSWORD,
    database: process.env.DB_DATABASE || 'jobSite'
}

const con = mysql.createConnection(connectionConfig);

con.connect(function(err){
    if (err) throw err;
    console.log('connected to mysql, database:' + connectionConfig.database);

})
con.query('DROP DATABASE IF EXISTS jobSite', function(err, result){
    if (err) throw err;
    console.log('Database dropped');
})
con.query("CREATE DATABASE IF NOT EXISTS jobSite", function(err, result){
    if (err) throw err;
    console.log('Database created');
})
con.query("USE jobSite", function(err, result){
    if (err) throw err;
    console.log('Using jobSite database');
})
//
con.query(`
    CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        employment VARCHAR(255),
        description LONGTEXT,
        department VARCHAR(255),
        classification VARCHAR(255),
        info LONGTEXT
    )
`, function(err, result){
    if (err) throw err;
    console.log('Table created');
})
con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Data Analyst', 'faculty', 'Analyzes data to provide insights', 'Data Science', 'Analyst', '<h2>Data Analysis</h2><p>Analyzing data to provide insights.</p><script>alert("xss detected")</script>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Project Manager', 'staff', 'Manages projects and coordinates teams', 'Management', 'Manager', '<h3>Project Management</h3><ul><li>Coordinate teams</li><li>Manage projects</li></ul>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('UX Designer', 'staff', 'Designs user interfaces and experiences', 'Design', 'Designer', '<h3>UX Design</h3><p>Designing user interfaces and experiences.</p><img src="https://example.com/image.jpg" alt="Design Image">')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Network Engineer', 'faculty', 'Maintains and troubleshoots network infrastructure', 'IT', 'Engineer', '<h3>Network Engineering</h3><p>Maintaining and troubleshooting network infrastructure.</p><a href="https://example.com">Learn more</a>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Marketing Specialist', 'staff', 'Develops marketing strategies and campaigns', 'Marketing', 'Specialist', '<h3>Marketing Strategies</h3><p>Developing marketing strategies and campaigns.</p><blockquote>Marketing is key to success.</blockquote>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('HR Coordinator', 'faculty', 'Coordinates HR activities and processes', 'Human Resources', 'Coordinator', '<h3>HR Coordination</h3><p>Coordinating HR activities and processes.</p><table><tr><td>Policy</td><td>Procedure</td></tr><tr><td>Recruitment</td><td>Onboarding</td></tr></table>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Financial Analyst', 'staff', 'Analyzes financial data and prepares reports', 'Finance', 'Analyst', '<h3>Financial Analysis</h3><p>Analyzing financial data and preparing reports.</p><code>SELECT * FROM financial_data;</code>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Content Writer', 'staff', 'Writes and edits content for various platforms', 'Content', 'Writer', '<h3>Content Writing</h3><p>Writing and editing content for various platforms.</p><pre>Content is king.</pre>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Customer Support Representative', 'faculty', 'Provides support to customers and resolves issues', 'Customer Support', 'Representative', '<h3>Customer Support</h3><p>Providing support to customers and resolving issues.</p><strong>Customer satisfaction is our priority.</strong>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});
con.query("SELECT * FROM jobs", function(err, rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
})
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
    skills VARCHAR(255)
)`)
con.query(`INSERT INTO jobApplications (
    hearAbout, position, workTime, start, name, curAddress, permAddress, contactInfo, preferredContact, authorized, sponsorship, everApplied, everEmployed, related, pastEmployment, highschool, university, gradUniversity, other, skills
) VALUES
('Online', 'Software Engineer', 'Full-time', '2023-01-01', 'John Doe', '123 Main St, Anytown, USA', '456 Elm St, Othertown, USA', 'john.doe@example.com', 'Email', 'Yes', 'No', 'No', 'Yes', 'Jane Doe', '{"employer1": {"name": "ABC Corp", "position": "Developer", "start": "2020-01-01", "end": "2022-01-01", "duties": "Developed software"}}', 'Anytown High School', 'State University', 'Tech University', 'None', 'JavaScript, React, Node.js'),
('Referral', 'Data Analyst', 'Part-time', '2023-02-01', 'Alice Smith', '789 Oak St, Sometown, USA', '101 Pine St, Anothertown, USA', 'alice.smith@example.com', 'Phone', 'Yes', 'Yes', 'Yes', 'No', 'Bob Smith', '{"employer1": {"name": "XYZ Inc", "position": "Analyst", "start": "2019-01-01", "end": "2021-01-01", "duties": "Analyzed data"}}', 'Sometown High School', 'City University', 'None', 'None', 'Python, SQL, Excel'),
('Job Fair', 'Project Manager', 'Temporary', '2023-03-01', 'Bob Johnson', '234 Maple St, Yourtown, USA', '567 Birch St, Thistown, USA', 'bob.johnson@example.com', 'Phone', 'No', 'No', 'No', 'Yes', 'Alice Johnson', '{"employer1": {"name": "LMN LLC", "position": "Manager", "start": "2018-01-01", "end": "2020-01-01", "duties": "Managed projects"}}', 'Yourtown High School', 'Regional University', 'None', 'None', 'Project Management, Agile, Scrum'),
('Job Fair', 'Data Analyst', 'Temporary', '2023-03-01', 'Bob Johnson', '234 Maple St, Yourtown, USA', '567 Birch St, Thistown, USA', 'bob.johnson@example.com', 'Phone', 'No', 'No', 'No', 'Yes', 'Alice Johnson', '{"employer1": {"name": "LMN LLC", "position": "Manager", "start": "2018-01-01", "end": "2020-01-01", "duties": "Managed projects"}}', 'Yourtown High School', 'Regional University', 'None', 'None', 'Project Management, Agile, Scrum');`, function(err, result) {
    if (err) throw err;
    console.log("Data inserted successfully");
});
con.query('SELECT * FROM jobApplications', function(err, rows){
    if (err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
})

con.end();