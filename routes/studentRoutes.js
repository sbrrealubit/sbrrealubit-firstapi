const express = require("express");
const router = express.Router();
const db = require("../db/db");

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tbl_student");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET SINGLE STUDENT
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM tbl_student WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ADD STUDENT
router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    age,
    course_id,
    department_id,
    status,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO tbl_student 
       (firstname, lastname, gender, age, course_id, department_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [firstname, lastname, gender, age, course_id, department_id, status]
    );

    res.status(201).json({
      message: "Student added successfully",
      student_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE STUDENT (ALL FIELDS)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    gender,
    age,
    course_id,
    department_id,
    status,
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE tbl_student 
       SET firstname = ?, lastname = ?, gender = ?, age = ?, 
           course_id = ?, department_id = ?, status = ?
       WHERE id = ?`,
      [
        firstname,
        lastname,
        gender,
        age,
        course_id,
        department_id,
        status,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE STUDENT STATUS ONLY
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE tbl_student SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM tbl_student WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
