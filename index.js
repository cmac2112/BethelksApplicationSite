require('dotenv').config()
const mysql = require('mysql');
const express = require('express');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())



const connectionConfig = {
    host: process.env.DB_HOST || 'Cmac24',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || DB_USER,
    password: process.env.DB_PASSWORD || DB_PASSWORD,
    database: process.env.DB_DATABASE || 'jobSite'
};
//no data in database right now
let con;

function connectWithRetry() {

    con = mysql.createConnection(connectionConfig);

    con.connect(function(err) {
        console.log('Connecting to MySQL');
        if (err) {
            console.log("error retrying");
            console.log('error when connecting to db:', err);
            setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds
        } else {
            console.log('Connected to MySQL');
        }
        
        con.query('SHOW TABLES', function(err, rows) {
            if (err){
                console.log("error in query");
                console.log('error in query:', err);
                setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds
            }
            console.log('Data received from Db:\n');
            console.log(rows);
        });

});

    con.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectWithRetry();  // Reconnect on connection loss
        } else {
            throw err
        }
    });
}   
connectWithRetry(); 
//authentication
app.get('/api/staff', (req, res, next) => {
    con.query(`SELECT * from jobs WHERE employment = 'staff'`, function(err, rows){
        console.log(req.method + ' request for ' + req.url);
        if(err){
            console.error('Error executing query ', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(rows);
    })
});
app.get('/api/faculty', (req, res, next) => {
    console.log(req.method + ' request for ' + req.url);
    con.query(`SELECT * from jobs WHERE employment = 'faculty'`, function(err, rows){
        if(err){
            console.error('Error executing query ', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(rows);
    })
}); 
app.get('/api/jobs', (req, res)=>{
    console.log(req.method + ' request for ' + req.url);
    con.query(`SELECT * FROM jobs`, function(err, rows){
        if(err){
            console.error("error executing query", err);
            res.status(500).send('error executing query');
            return;
        }
        res.send(rows);
    })
})
app.post('/api/newjob', (req, res) =>{
    console.log(req.method + ' request for ' + req.url)
    const body = req.body
    const sql = `INSERT INTO jobs (title, employment, description, department, classification, info) VALUES (?, ?, ?, ?, ?, ?)`
    const values = [body.title, body.employment, body.description, body.department, body.classification, body.info]
    con.query(sql, values, (err, result)=>{
        if(err){
            console.error(`error inserting values`,err);
            return res.status(500).send("error inserting job")
        }
        res.send("job posted")
    })})


app.post('/api/multer', upload.single('file'), (req, res) => {
    if(!req.file){
        return res.status(400).send('no file uploaded')
    }
    const file = req.file
    const sql = `INSERT INTO testFile (name, data, mime_type) VALUES (?, ?, ?)`;
    const values = [file.originalname, file.buffer, file.mimetype]

    con.query(sql, values, (err, result)=>{
        if(err){
            console.error(`error inserting file`, err)
            return res.status(500).send("error inserting file")
        }
        res.send("file uploaded successfully")
    })
});

//dont do this, storing files to mysql is dumb, just testing file upload with multer
app.get('/api/file', (req, res) =>{
    const sql = `SELECT * from testFile ORDER BY id DESC LIMIT 1`;
    con.query(sql, (err, results) =>{
        if(err){
            console.error(`error fetching`, err);
            return res.status(500).send('error fetching file')
        }
        const file = results[0]
        res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        res.setHeader('Content-Type', file.mime_type);
        res.send(file.data);
        })
    });
    
    

app.post('/api/apply', (req, res)=>{
    console.log(req.method + ' reqest for ' + req.url)
    console.log('recieved data:', req.body)
    const query = `INSERT INTO applications (hear_about, additional_info)`
    res.json({message: 'received data', data: req.body})
}) 

app.get('/api/applications/:id', (req, res)=>{
    const { id } = req.params;
    console.log(req.method + ' request for ' + req.url + ' with id ' + id)
    con.query(`SELECT * from jobapplications WHERE position = ?`, [id], function(err, rows){
        if(err){
            console.error("error executing query", err);
            res.status(500).send('error executing query')
            return
        }
        if(rows.length === 0){
            res.send("no applications, or not found")
            return;
        }
        res.send(rows)
    })
})
const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () =>{
        console.log('Server started on port ' + port);
    })
