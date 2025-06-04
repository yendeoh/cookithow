const express = require("express");
const bcrypt = require("bcrypt");
const { sql, db } = require("./dbconnection/db-config");

const router = express.Router();

// Login Route - Verifies user credentials
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.request()
            .input("email", sql.VarChar, email)
            .query("SELECT id, username, email, password_hash FROM users WHERE email = @email");

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = result.recordset[0];

        // Compare hashed password
        if (bcrypt.compareSync(password, user.password_hash)) {
            res.json({ success: true, user: { id: user.id, username: user.username } });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Signup Route - Registers a new user
router.post("/signup", async (req, res) => {
    console.log("Received signup request:", req.body); // Debugging step

    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
        console.error("Missing required signup fields!");
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await db.request()
            .input("username", sql.VarChar, username)
            .input("fullName", sql.VarChar, fullName)
            .input("email", sql.VarChar, email)
            .input("password_hash", sql.VarChar, hashedPassword)
            .query("INSERT INTO users (username, full_name, email, password_hash) VALUES (@username, @fullName, @email, @password_hash)");

        console.log("Signup result:", result.rowsAffected); // Debugging step

        res.json({ success: true });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;