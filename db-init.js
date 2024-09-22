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
con.query(`
    CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        employment TINYINT(1),
        description LONGTEXT,
        department VARCHAR(255),
        classification VARCHAR(255),
        info LONGTEXT
    )
`, function(err, result){
    if (err) throw err;
    console.log('Table created');
})
con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Data Analyst', 1, 'Analyzes data to provide insights', 'Data Science', 'Analyst', '<h2>Data Analysis</h2><p>Analyzing data to provide insights.</p><script>alert("xss detected")</script>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Project Manager', 0, 'Manages projects and coordinates teams', 'Management', 'Manager', '<h3>Project Management</h3><ul><li>Coordinate teams</li><li>Manage projects</li></ul>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('UX Designer', 0, 'Designs user interfaces and experiences', 'Design', 'Designer', '<h3>UX Design</h3><p>Designing user interfaces and experiences.</p><img src="https://example.com/image.jpg" alt="Design Image">')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Network Engineer', 1, 'Maintains and troubleshoots network infrastructure', 'IT', 'Engineer', '<h3>Network Engineering</h3><p>Maintaining and troubleshooting network infrastructure.</p><a href="https://example.com">Learn more</a>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Marketing Specialist', 0, 'Develops marketing strategies and campaigns', 'Marketing', 'Specialist', '<h3>Marketing Strategies</h3><p>Developing marketing strategies and campaigns.</p><blockquote>Marketing is key to success.</blockquote>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('HR Coordinator', 1, 'Coordinates HR activities and processes', 'Human Resources', 'Coordinator', '<h3>HR Coordination</h3><p>Coordinating HR activities and processes.</p><table><tr><td>Policy</td><td>Procedure</td></tr><tr><td>Recruitment</td><td>Onboarding</td></tr></table>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Financial Analyst', 0, 'Analyzes financial data and prepares reports', 'Finance', 'Analyst', '<h3>Financial Analysis</h3><p>Analyzing financial data and preparing reports.</p><code>SELECT * FROM financial_data;</code>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Content Writer', 0, 'Writes and edits content for various platforms', 'Content', 'Writer', '<h3>Content Writing</h3><p>Writing and editing content for various platforms.</p><pre>Content is king.</pre>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});

con.query(`INSERT INTO jobs (title, employment, description, department, classification, info) VALUES ('Customer Support Representative', 1, 'Provides support to customers and resolves issues', 'Customer Support', 'Representative', '<h3>Customer Support</h3><p>Providing support to customers and resolving issues.</p><strong>Customer satisfaction is our priority.</strong>')`, function(err, result) {
    if (err) throw err;
    console.log('Row inserted');
});
con.query("SELECT * FROM jobs", function(err, rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
})
//missing file areas for now after ever employed nail down what is needed
con.query(`CREATE TABLE IF NOT EXISTS jobApplication (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hearAbout INT,
    position VARCHAR(255),
    workTime VARCHAR(255),
    start VARCHAR(255),
    name VARCHAR(255),
    curAddress VARCHAR(255),
    permAddress VARCHAR(255),
    contactInfo VARCHAR(255),
    preferredContact VARCHAR(255),
    authorized INT,
    sponsorship INT,
    everApplied INT,
    everEmployed INT,
    pastEmployment LONGTEXT,
    highschool VARCHAR(255),
    university VARCHAR(255),
    gradUniversity VARCHAR(255),
    other VARCHAR(255),
    skills VARCHAR(255)
)`)
con.query(`INSERT INTO jobApplication (
        hearAbout, position, workTime, start, name, curAddress, permAddress, contactInfo, preferredContact, authorized, sponsorship, everApplied, everEmployed, pastEmployment, highschool, university, gradUniversity, other, skills
    ) VALUES (
        1, 'Software Engineer', 'Full-time', '2023-01-01', 'John Doe', '123 Main St', '456 Elm St', 'john.doe@example.com', 'email', 1, 0, 0, 0, 'Worked at XYZ Corp for 5 years', 'ABC High School', 'DEF University', 'GHI Grad School', 'None', 'JavaScript, Node.js, MySQL'
    ), (
        2, 'Data Analyst', 'Part-time', '2023-02-01', 'Jane Smith', '789 Oak St', '101 Pine St', 'jane.smith@example.com', 'phone', 1, 1, 1, 0, 'Worked at ABC Inc for 3 years', 'XYZ High School', 'LMN University', 'OPQ Grad School', 'None', 'Python, SQL, Excel'
    ), (
        3, 'Project Manager', 'Contract', '2023-03-01', 'Alice Johnson', '234 Maple St', '567 Birch St', 'alice.johnson@example.com', 'email', 1, 0, 0, 1, 'Worked at DEF Ltd for 7 years', 'PQR High School', 'STU University', 'VWX Grad School', 'None', 'Project Management, Agile, Scrum'
    )`, function(err, result) {
        if (err) throw err;
        console.log('Dummy data inserted into jobApplication table');
    });
con.query('SELECT * FROM jobApplication', function(err, rows){
    if (err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
})

con.end();