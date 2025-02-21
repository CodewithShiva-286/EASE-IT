const db = require('../config/db');
const bcrypt = require('bcrypt');

// Function to create a new user
const createUser = async (name, email, password, healthData) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const healthDataString = JSON.stringify(healthData); // Convert object to JSON string

        const sql = 'INSERT INTO userinfo (name, email, password, healthData) VALUES (?, ?, ?, ?)';
        const [result] = await db.promise().execute(sql, [name, email, hashedPassword, healthDataString]);

        return { id: result.insertId, name, email, healthData };
    } catch (error) {
        throw error;
    }
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM userinfo WHERE email = ?';
        const [rows] = await db.promise().execute(sql, [email]);

        if (rows.length > 0) {
            let user = rows[0];
            user.healthData = JSON.parse(user.healthData); // Convert JSON string back to object
            return user;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser, findUserByEmail };
