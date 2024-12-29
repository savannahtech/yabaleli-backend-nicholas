import express, { type Router } from "express";
import swaggerUI from "swagger-ui-express";
import config from "../config";
import swaggerSpec from "../utils/js-doc";
import auth from "./auth";
import bet from "./bet";

const { baseUrl } = config;
const router: Router = express.Router();

router.use(`${baseUrl}/bet`, bet);
router.use(`${baseUrl}/auth`, auth);
router.use(`${baseUrl}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default router;
