require('dotenv').config()
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


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
const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () =>{
        console.log('Server started on port ' + port);
    })
