import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { curriculoRoutes } from "./modules/curriculos/curriculo.routes.js";
import { experienciaAcademicaRoutes } from "./modules/experiencias-academicas/experiencia-academica.routes.js";
import { experienciaProfissionalRoutes } from "./modules/experiencias-profissionais/experiencia-profissional.routes.js";
import { AppError } from "./shared/errors/AppError.js";
import { ErrorCode } from "./shared/errors/error-code.js";
import { errorHandlerMiddleware } from "./shared/middlewares/error.middleware.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "curriculos-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/curriculos", curriculoRoutes);
app.use(experienciaAcademicaRoutes);
app.use(experienciaProfissionalRoutes);

app.use((_req, _res, next) => {
  next(
    new AppError({
      message: "Rota nao encontrada.",
      statusCode: 404,
      errorCode: ErrorCode.NOT_FOUND,
    }),
  );
});

app.use(errorHandlerMiddleware);