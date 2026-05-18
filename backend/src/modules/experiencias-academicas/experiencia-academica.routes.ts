import { Router } from "express";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { ExperienciaAcademicaController } from "./experiencia-academica.controller.js";
import {
  createExperienciaAcademicaSchema,
  curriculoIdParamSchema,
  experienciaAcademicaIdParamSchema,
  updateExperienciaAcademicaSchema,
} from "./experiencia-academica.dto.js";
import { ExperienciaAcademicaRepository } from "./experiencia-academica.repository.js";
import { ExperienciaAcademicaService } from "./experiencia-academica.service.js";

const curriculoRepository = new CurriculoRepository();
const experienciaAcademicaRepository = new ExperienciaAcademicaRepository();
const experienciaAcademicaService = new ExperienciaAcademicaService(
  experienciaAcademicaRepository,
  curriculoRepository,
);
const experienciaAcademicaController = new ExperienciaAcademicaController(
  experienciaAcademicaService,
);

export const experienciaAcademicaRoutes = Router();

experienciaAcademicaRoutes.get(
  "/curriculos/:curriculoId/experiencias-academicas",
  validate(curriculoIdParamSchema, "params"),
  experienciaAcademicaController.findByCurriculo,
);

experienciaAcademicaRoutes.post(
  "/curriculos/:curriculoId/experiencias-academicas",
  validate(curriculoIdParamSchema, "params"),
  validate(createExperienciaAcademicaSchema),
  experienciaAcademicaController.create,
);

experienciaAcademicaRoutes.get(
  "/experiencias-academicas/:id",
  validate(experienciaAcademicaIdParamSchema, "params"),
  experienciaAcademicaController.findById,
);

experienciaAcademicaRoutes.put(
  "/experiencias-academicas/:id",
  validate(experienciaAcademicaIdParamSchema, "params"),
  validate(updateExperienciaAcademicaSchema),
  experienciaAcademicaController.update,
);

experienciaAcademicaRoutes.delete(
  "/experiencias-academicas/:id",
  validate(experienciaAcademicaIdParamSchema, "params"),
  experienciaAcademicaController.delete,
);