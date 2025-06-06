import { pool } from "../server.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';




export async function signup(req, reply) {
  console.log("Helloo from signup");

  const { name,nick, email, password } = req.body;

  if (!name)
    return reply.code(400).send({ message: "please fill in the name" });
  if (!email)
    return reply.code(400).send({ message: "please fill in the email" });
  if (!password)
    return reply.code(400).send({ message: "please fill in the password" });
  if (!nick)
    return reply.code(400).send({ message: "please fill in the password" });

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("EMAIL =>", email);
  try {
    const hasUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    console.log("user", hasUser.rowCount);
    if (hasUser.rowCount === 0) {
      console.log("We create user");
      const signup = await pool.query(
        `INSERT INTO users (name,nick, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [name,nick, email, hashedPassword]
      );
      const token = jwt.sign(
        { email }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );
      
      console.log("TOKEN=>", token);

      return reply.code(201).send({ message: "USER created", token, id:signup.rows[0].id});
    } else {
      return reply.code(400).send({ message: "User already exist" });
    }
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function login(req, reply) {
  console.log("Helloo from login");

  const { email, password } = req.body;

  if (!email)
    return reply.code(400).send({ message: "please fill in the email" });
  if (!password)
    return reply.code(400).send({ message: "please fill in the password" });

  try {
    const hasUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("USER=>", hasUser.rows[0].id)


    if (hasUser.rowCount !== 0) {

      const isValid = await bcrypt.compare(password, hasUser.rows[0].password);
      const kuku = hasUser.rows[0]
      if (isValid) {
        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET,
            { expiresIn: '3h' } 
          );
          
        return reply.code(200).send({ message: "we logged in", kuku, token, id:hasUser.rows[0].id});
      } else {
        return reply.code(200).send({ message: "wrong pass" });
      }
    } else {
      return reply.code(400).send({ message: "No such as user" });
    }
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
