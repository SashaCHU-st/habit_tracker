import { SignUpSchema, LoginSchema } from "../schema/auth.js";
import {signup, login} from "../controllers/authController.js"

async function authRoutes(fastify) {
  console.log("Hello, we in authRoutes");
  fastify.post("/login", async (req, reply) => {
    const validated = LoginSchema.safeParse(req.body);
    if (!validated.success) {
      return reply.code(400).send({
        message: "Valiadatoion error",
        errors: validated.error.errors,
      });
    }
    return login({ ...req, body: validated.data }, reply);
  });

  fastify.post("/signup", async (req, reply) => {
    console.log("WE in signup");
    const validated = SignUpSchema.safeParse(req.body);
    if (!validated.success) {
      return reply.code(400).send({
        message: "Valiadatoion error",
        errors: validated.error.errors,
      });
    }
    return signup({ ...req, body: validated.data }, reply);
  });
}

export default authRoutes;
