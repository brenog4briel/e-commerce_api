import { FastifyInstance } from "fastify";
import { fieldsUpload, uploadFile } from "../upload/upload";

export async function UploadRoutes(fastify: FastifyInstance) {

    fastify.post("/",{preHandler:fieldsUpload} ,uploadFile);
}

