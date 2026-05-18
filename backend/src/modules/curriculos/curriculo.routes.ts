import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import {
  createCurriculoSchema,
  curriculoIdParamSchema,
  updateCurriculoSchema,
} from "./curriculo.dto.js";
import { CurriculoController } from "./curriculo.controller.js";
import { CurriculoRepository } from "./curriculo.repository.js";
import { CurriculoService } from "./curriculo.service.js";

const curriculoRepository = new CurriculoRepository();
const curriculoService = new CurriculoService(curriculoRepository);
const curriculoController = new CurriculoController(curriculoService);

export const curriculoRoutes = Router();

curriculoRoutes.get("/", curriculoController.findAll);

curriculoRoutes.get(
  "/:id/completo",
  validate(curriculoIdParamSchema, "params"),
  curriculoController.findCompleteById,
);

curriculoRoutes.get(
  "/:id",
  validate(curriculoIdParamSchema, "params"),
  curriculoController.findById,
);

curriculoRoutes.post(
  "/",
  validate(createCurriculoSchema),
  curriculoController.create,
);

curriculoRoutes.put(
  "/:id",
  validate(curriculoIdParamSchema, "params"),
  validate(updateCurriculoSchema),
  curriculoController.update,
);

curriculoRoutes.delete(
  "/:id",
  validate(curriculoIdParamSchema, "params"),
  curriculoController.delete,
);
