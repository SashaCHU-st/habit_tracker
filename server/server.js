import Fastify from "fastify";
import jwt from '@fastify/jwt';
import fastifyCors from "@fastify/cors";
import  dotenv  from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
import statisticRoutes from "./routes/statisticRoutes.js"
import tasksRoutes from "./routes/taskRoutes.js"
import pkg from 'pg';
dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });
  
  
  const fastify = Fastify();
  fastify.register(jwt, { secret: "kuku" });

fastify.register(fastifyCors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], 
});


fastify.register(tasksRoutes)
fastify.register(authRoutes)
fastify.register(statisticRoutes)
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3001 });
        console.log('Server started');
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();
