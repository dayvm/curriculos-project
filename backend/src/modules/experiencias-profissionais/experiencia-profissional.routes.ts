import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import { ExperienciaProfissionalController } from "./experiencia-profissional.controller.js";
import {
  createExperienciaProfissionalSchema,
  curriculoIdParamSchema,
  experienciaProfissionalIdParamSchema,
  updateExperienciaProfissionalSchema,
} from "./experiencia-profissional.dto.js";
import { ExperienciaProfissionalRepository } from "./experiencia-profissional.repository.js";
import { ExperienciaProfissionalService } from "./experiencia-profissional.service.js";

const curriculoRepository = new CurriculoRepository();
const experienciaProfissionalRepository = new ExperienciaProfissionalRepository();
const experienciaProfissionalService = new ExperienciaProfissionalService(
  experienciaProfissionalRepository,
  curriculoRepository,
);
const experienciaProfissionalController = new ExperienciaProfissionalController(
  experienciaProfissionalService,
);

export const experienciaProfissionalRoutes = Router();

experienciaProfissionalRoutes.get(
  "/curriculos/:curriculoId/experiencias-profissionais",
  validate(curriculoIdParamSchema, "params"),
  experienciaProfissionalController.findByCurriculo,
);

experienciaProfissionalRoutes.post(
  "/curriculos/:curriculoId/experiencias-profissionais",
  validate(curriculoIdParamSchema, "params"),
  validate(createExperienciaProfissionalSchema),
  experienciaProfissionalController.create,
);

experienciaProfissionalRoutes.get(
  "/experiencias-profissionais/:id",
  validate(experienciaProfissionalIdParamSchema, "params"),
  experienciaProfissionalController.findById,
);

experienciaProfissionalRoutes.put(
  "/experiencias-profissionais/:id",
  validate(experienciaProfissionalIdParamSchema, "params"),
  validate(updateExperienciaProfissionalSchema),
  experienciaProfissionalController.update,
);

experienciaProfissionalRoutes.delete(
  "/experiencias-profissionais/:id",
  validate(experienciaProfissionalIdParamSchema, "params"),
  experienciaProfissionalController.delete,
);