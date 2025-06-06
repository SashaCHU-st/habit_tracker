import { StatisticSchema } from "../schema/statisticSchema.js";
import { statistics } from "../controllers/statisticsController.js";
async function statisticRoutes(fastify) {
  console.log("WE in statis");
  fastify.post(`/statistics`, async (req, reply) => {
    const validated = StatisticSchema.safeParse(req.body);

    if (!validated.success) {
      return reply.code(400).send({
        message: "Validation error",
        errors: validated.error.errors,
      });
    }
    return statistics({ ...req, body: validated.data }, reply);
  });
}
export default statisticRoutes;
