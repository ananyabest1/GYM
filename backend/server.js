/*console.log("Starting the server...");
require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Database Connection
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1); // Exit the app if DB connection fails
  }
  console.log("Database connected!");
});

// Fetch Available Batches
app.get("/api/batches", (req, res) => {
  const query = "SELECT * FROM batches";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching batches:", err);
      return res.status(500).json({ message: "Failed to fetch batches." });
    }
    res.json(results);
  });
});

// Register a User
app.post("/api/register", (req, res) => {
  const { name, email, phone, address, password, batchId } = req.body;

  if (!name || !email || !phone || !address || !password || !batchId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `INSERT INTO users (name, email, phone, address, password, batch_id) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(
    query,
    [name, email, phone, address, password, batchId],
    (err, results) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Registration failed." });
      }
      res.json({ message: "User registered successfully!" });
    }
  );
});

// View Unpaid Users
app.get("/api/unpaid", (req, res) => {
  const query = `SELECT u.name, u.email, p.amount_due 
                 FROM users u 
                 JOIN payments p ON u.id = p.user_id 
                 WHERE p.status = 'unpaid'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching unpaid users:", err);
      return res.status(500).json({ message: "Failed to fetch unpaid users." });
    }
    res.json(results);
  });
});

// Calculate Outstanding Dues
app.get("/api/dues", (req, res) => {
  const query = `SELECT u.name, u.email, SUM(p.amount_due) AS total_due 
                 FROM users u 
                 JOIN payments p ON u.id = p.user_id 
                 GROUP BY u.id`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error calculating dues:", err);
      return res.status(500).json({ message: "Failed to calculate dues." });
    }
    res.json(results);
  });
});

// Start Server
const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

/*console.log("Loading environment variables...");
require("dotenv").config();

console.log("Setting up dependencies...");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/database");

const app = express();

console.log("Setting up middleware...");
app.use(cors());
app.use(bodyParser.json());

console.log("Connecting to the database...");
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("Database connected!");
});

// Test route
console.log("Setting up routes...");
app.get("/", (req, res) => {
  console.log("Handling GET / request...");
  res.send("Server is up and running!");
});

// Start the server
const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/

console.log("Loading environment variables...");
require("dotenv").config();

console.log("Setting up dependencies...");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./config/database");

const app = express();

console.log("Setting up middleware...");
app.use(cors());
app.use(bodyParser.json());

// Test route
console.log("Setting up routes...");
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Fetch batches route
app.get("/api/batches", (req, res) => {
  const query = "SELECT * FROM batches";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching batches:", err);
      return res.status(500).json({ error: "Failed to fetch batches" });
    }
    res.status(200).json(results);
  });
});

// Submit registration route
app.post("/api/register", (req, res) => {
  const { name, email, phone, address, password, batch } = req.body;

  if (!name || !email || !phone || !address || !password || !batch) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO registrations (name, email, phone, address, password, batch_id) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, phone, address, password, batch],
    (err, result) => {
      if (err) {
        console.error("Error submitting registration:", err);
        return res.status(500).json({ error: "Failed to submit registration" });
      }
      res.status(201).json({
        message: "Registration successful!",
        registrationId: result.insertId,
      });
    }
  );
});

// Payment route (mock implementation)
app.post("/api/payment", (req, res) => {
  const { registrationId } = req.body;

  if (!registrationId) {
    return res.status(400).json({ error: "Registration ID is required" });
  }

  const updateQuery =
    "UPDATE registrations SET payment_status = 'Paid' WHERE id = ?";
  connection.query(updateQuery, [registrationId], (err) => {
    if (err) {
      console.error("Error processing payment:", err);
      return res.status(500).json({ error: "Failed to process payment" });
    }
    res.status(200).json({ message: "Payment successful!" });
  });
});

// Start the server
const PORT = process.env.PORT || 6500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




