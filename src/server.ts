import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({ logger: true });

app.listen({ port: 3500 }, () => {
  console.log("The server is running in port 3500");
});
