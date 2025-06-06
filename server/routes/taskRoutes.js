import {
  createTask,
  myTasks,
  markDay,
  newDay,
  deleteTask,
  myTask,
} from "../controllers/tasksControllers.js";
import {
  TaskSchema,
  MarkDaySchema,
  MyTasksSchema,
  DeleteSchema,
  MyTaskSchema,
} from "../schema/tasksSchema.js";
import { pool } from "../server.js";

async function taskRoutes(fastify) {
  console.log("WE in task routes");
  fastify.post(`/createTask`, async (req, reply) => {
    console.log("IN CREATE TASK");
    const validated = TaskSchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return createTask({ ...req, body: validated.data }, reply);
  });

  fastify.delete(`/deleteTask`, async (req, reply) => {
    console.log("IN Delete TASK");
    const validated = DeleteSchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return deleteTask({ ...req, body: validated.data }, reply);
  });

  ///Maybe not needed???
  fastify.post(`/markDay`, async (req, reply) => {
    console.log("IN mark day");
    const validated = MarkDaySchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return markDay({ ...req, body: validated.data }, reply);
  });

  fastify.post(`/newDay`, async (req, reply) => {
    console.log("IN mark day");
    const validated = MarkDaySchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return newDay({ ...req, body: validated.data }, reply);
  });
  fastify.post(`/myTasks`, async (req, reply) => {
    const validated = MyTasksSchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return myTasks({ ...req, body: validated.data }, reply);
  });
  fastify.post(`/myTask`, async (req, reply) => {
    const validated = MyTaskSchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return myTask({ ...req, body: validated.data }, reply);
  });
fastify.get("/task/:taskId", async (req, reply) => {
  const { taskId } = req.params;

  const taskResult = await pool.query("SELECT * FROM tasks WHERE id = $1", [
    taskId,
  ]);
  if (taskResult.rows.length === 0) {
    return reply.code(404).send({ message: "Task not found" });
  }

  const task = taskResult.rows[0];

  const taskDaysResult = await pool.query(
    "SELECT date, status FROM task_statuses WHERE task_id = $1",
    [taskId]
  );

  task.task_days = taskDaysResult.rows;

  return reply.send({ task });
});


}

export default taskRoutes;
