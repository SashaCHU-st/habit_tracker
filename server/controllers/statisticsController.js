import { pool } from "../server.js";
export async function statistics(req, reply) {
  console.log("WE IN stat");

  const { task_id, status1 } = req.body;

  try {
    const statistic = await pool.query(
      `SELECT AVG(status) FROM task_statuses WHERE task_id = $1`,
      [task_id]
    );

    console.log("Statistics=>",statistic.rows[0].avg)
    const inPercente = statistic.rows[0].avg * 100;
    return reply.code(200).send({ AVG:inPercente  });
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
