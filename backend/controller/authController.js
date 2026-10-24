const { JWT_SECRET } = require("../config/env");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");


const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    console.log("name : ",name )

    if (!name || !password) {
      return res.status(400).json({
        messaege: "Provide a valid username and password",
      });
    }

    const [users] = await pool.query(`SELECT * FROM authors WHERE  name =?`, [
      name,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    //JWT TOKEN GENERATION

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error :", error);
    return res.status(500).json({
      messaege: "Login in Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      name,
      initials,
      role,
      bio,
      avatar_bg,
      avatar_text,
      accent_color,
      location,
      password,
    } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    const [existingUser] = await pool.query(
      `SELECT * FROM authors WHERE name = ?`,
      [name],
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: "false",
        message: "User already exists",
      });
    }

    //hash paasword

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO authors (
    name,
    initials,
    role,
    bio,
    avatar_bg,
    avatar_text,
    accent_color,
    location,
    password,
    joined_year
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, YEAR(CURRENT_DATE))`,
      [
        name,
        initials,
        role,
        bio ?? null,
        avatar_bg,
        avatar_text,
        accent_color,
        location,
        hashedPassword,
      ],
    );

    return res.status(200).json({
      messaege: "User Created Successfully",
      result,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

module.exports = {
  login,
  register,
};
