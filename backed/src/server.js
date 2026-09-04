const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test PostgreSQL connection
pool.connect()
  .then(() => {
    console.log("PostgreSQL connected successfully");
  })
  .catch((error) => {
    console.error("PostgreSQL connection error:", error.message);
  });

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Employee Portal Backend is running"
  });
});

// Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch employees"
    });
  }
});
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;

    const result = await pool.query(
      `INSERT INTO employees (name, email, department, salary)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, department, salary]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create employee"
    });
  }
});
app.put("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;

    const result = await pool.query(
      `UPDATE employees
       SET name = $1, email = $2, department = $3, salary = $4
       WHERE id = $5
       RETURNING *`,
      [name, email, department, salary, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update employee"
    });
  }
});
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Employee not found"
      });
    }

    res.json({
      message: "Employee deleted successfully",
      employee: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete employee"
    });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});