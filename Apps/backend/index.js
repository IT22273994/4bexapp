const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001; 

 
app.use(cors());
app.use(bodyParser.json());

 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3307,
    connectionLimit: 10,
});

pool.getConnection()
    .then(connection => {
        console.log('  Database connected successfully');
        connection.release();
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error(' Database connection failed:', error.message);
    });
 
app.post('/post', async (req, res) => {
    try {
        const { resoursename, days, need, start_date, end_date } = req.body;
        
        if (!resoursename || !days) {
            return res.status(400).json({ message: "Missing name or days" });
        }

        const query = "INSERT INTO details1 (resoursename, days, need, start_date, end_date) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, [resoursename, days, need, start_date, end_date]);

        res.status(201).json({
            message: "Data inserted successfully",
            insertedId: result.insertId
        });

    } catch (error) {
        console.error(" Error inserting data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 
app.get("/fetch", async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM resourse1");
        res.json(result);
    } catch (err) {
        console.error(" Error fetching data:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 
app.put("/update/:resoursename", async (req, res) => {
    try {
        const Id = req.params.resoursename;
        const status = req.body.status;

        const [result] = await pool.query("UPDATE resourse1 SET status=? WHERE resoursename=?", [status, Id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Record not found" });
        }

        res.json({ message: "Record updated successfully" });

    } catch (err) {
        console.error(" Update Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 
app.get('/utilization', async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT resoursename, days, 
                   DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, 
                   DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date 
            FROM details1
        `);

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

         
        const formattedData = result.map(item => ({
            name: item.resoursename,
            daysUsed: Number(item.days),
            startDate: item.start_date,
            endDate: item.end_date
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("  Error fetching utilization data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = pool;
