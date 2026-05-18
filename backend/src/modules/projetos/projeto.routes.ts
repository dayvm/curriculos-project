import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import { ProjetoController } from "./projeto.controller.js";
import {
  createProjetoSchema,
  curriculoIdParamSchema,
  projetoIdParamSchema,
  updateProjetoSchema,
} from "./projeto.dto.js";
import { ProjetoRepository } from "./projeto.repository.js";
import { ProjetoService } from "./projeto.service.js";

const curriculoRepository = new CurriculoRepository();
const projetoRepository = new ProjetoRepository();
const projetoService = new ProjetoService(
  projetoRepository,
  curriculoRepository,
);
const projetoController = new ProjetoController(projetoService);

export const projetoRoutes = Router();

projetoRoutes.get(
  "/curriculos/:curriculoId/projetos",
  validate(curriculoIdParamSchema, "params"),
  projetoController.findByCurriculo,
);

projetoRoutes.post(
  "/curriculos/:curriculoId/projetos",
  validate(curriculoIdParamSchema, "params"),
  validate(createProjetoSchema),
  projetoController.create,
);

projetoRoutes.get(
  "/projetos/:id",
  validate(projetoIdParamSchema, "params"),
  projetoController.findById,
);

projetoRoutes.put(
  "/projetos/:id",
  validate(projetoIdParamSchema, "params"),
  validate(updateProjetoSchema),
  projetoController.update,
);

projetoRoutes.delete(
  "/projetos/:id",
  validate(projetoIdParamSchema, "params"),
  projetoController.delete,
);