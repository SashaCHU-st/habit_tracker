import { pool } from "../server.js";

///Cannot add task past day
//Cannot add range that end day is less then start day
export async function createTask(req, reply) {
  console.log("WE IN TASKS");

  const { user_id, task, task_start, task_end } = req.body;

  // console.log("111", user_id)
  // console.log("111", task)
  // console.log("111", task_start)
  // console.log("111", task_end)

  if(!task || !task_start || !task_end) 
  {
     return reply.code(404).send({ message: "Fill required field" });
  }

  try {
    const taskExist = await pool.query(`SELECT * FROM tasks WHERE task = $1`, [
      task,
    ]);

    if (taskExist.rowCount === 0) {
      console.log("ID=>",user_id)
      const task1 = await pool.query(
        `INSERT INTO tasks (user_id, task, task_start, task_end) 
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [user_id, task, task_start, task_end]
      );
      if (!task1.rows) {
        console.log("We are here1");
        return reply.code(500).send({ message: "Task not inserted" });
      }
      console.log("Task1=>", task1);
      if (task1.rowCount === 0) {
        return reply.code(500).send({ message: "Task not inserted" });
      }
      const task_id = task1.rows[0].id;
      console.log("Task_id=>", task_id);

      const dateDiff = await pool.query(
        `SELECT task_end - task_start AS date_diff FROM tasks`
      );

      console.log("Date diff =>", dateDiff.rows[0].date_diff);

      const differents = dateDiff.rows[0].date_diff + 1;

      const insertDates = await pool.query(
        `
        WITH RECURSIVE dates(date) AS (
          SELECT $1::date
          UNION ALL
          SELECT (date + INTERVAL '1 day')::date
          FROM dates
          WHERE date < $2::date
        )
        INSERT INTO task_statuses (date, task_id)
        SELECT date, $3 FROM dates
        `,
        [task_start, task_end, task_id]
      );
      
      const how_many_days = await pool.query(
        `UPDATE tasks SET how_many_days = $1 WHERE  id = $2 RETURNING id`,
        [differents, task_id]
      );

      return reply.code(201).send({ message: "Task created", task_id:how_many_days.rows[0].id });
    } else {
      return reply.code(409).send({ message: "Task already exist" });
    }
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function deleteTask(req, reply) {
  console.log("IN DELETE")

  const {task_id, task} = req.body;

  // console.log("task_id", task_id)
  // console.log("task", task)
  try
  {
    const deleteFromStatuses = await pool.query(` DELETE FROM task_statuses WHERE task_id = $1 `,[task_id])

    const deleteFromTasks = await pool.query(`DELETE FROM tasks WHERE task = $1`, [task])

    return reply.code(200).send({ message: "Deleted", fromStatuses:deleteFromStatuses, fromTasks: deleteFromTasks });


  }catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
  
}

export async function myTasks(req, reply) {

  const {user_id} = req.body;
  try {
    const myTasks = await pool.query(`SELECT * FROM tasks WHERE user_id = $1`,[user_id]);
  
    return reply.code(200).send({ message: "Tasks",tasks:myTasks.rows });
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function myTask(req, reply) {

  const {task_id} = req.body;
  try {
    const myTask = await pool.query(`SELECT * FROM task_statuses WHERE task_id = $1`,[task_id]);
  
    return reply.code(200).send({ message: "Tasks",tasks:myTask.rows });
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
///???? Not sure maybe delete later
export async function markDay(req, reply) {
  console.log("WE IN MARK DAY MIDD:EWARE");

  const { task_id, date, status1 } = req.body;
  console.log("DATE=>", date);

  try {
    const first_date = await pool.query(
      `UPDATE task_statuses SET date = $1, status = $2 WHERE task_id = $3`,
      [date, status1, task_id]
    );

    return reply.code(201).send({ message: "Tasks", first_date });
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}

export async function newDay(req, reply) {
  console.log("WE IN NEW DAY");

  const { task_id, date, status1 } = req.body;

  console.log("jjjj=>",task_id)
  console.log("jjjj=>",date)
  console.log("jjjj=>",status1)

  try {
    const checkRange = await pool.query(
      `SELECT * FROM tasks WHERE $1 BETWEEN task_start AND task_end AND id = $2;`,
      [date, task_id]
    );
    console.log("IN RANGE =>", checkRange.rowCount);
    // if (checkRange.rowCount !== 0) {
      const dateExist = await pool.query(
        `SELECT * FROM task_statuses WHERE task_id=$1 AND date = $2`,
        [task_id, date]
      );
      // console.log("nnnn",dateExist)
      if (dateExist.rowCount !== 0) {
        console.log("DATE EXISTS");
        const first_date = await pool.query(
          `UPDATE task_statuses SET date = $1, status = $2 WHERE date_id = $3`,
          [date, status1, dateExist.rows[0].date_id]
        );

        // console.log("mmmmm",first_date)
        return reply.code(201).send({ message: "Tasks", first_date,smth: checkRange.rows[0] });
      } 
    // }
     else {
      return reply.code(400).send({ message: "Out of range" });
    }
  } catch (err) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}
