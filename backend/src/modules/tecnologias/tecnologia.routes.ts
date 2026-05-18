import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { TecnologiaController } from "./tecnologia.controller.js";
import {
  createTecnologiaSchema,
  tecnologiaIdParamSchema,
  updateTecnologiaSchema,
} from "./tecnologia.dto.js";
import { TecnologiaRepository } from "./tecnologia.repository.js";
import { TecnologiaService } from "./tecnologia.service.js";

const tecnologiaRepository = new TecnologiaRepository();
const tecnologiaService = new TecnologiaService(tecnologiaRepository);
const tecnologiaController = new TecnologiaController(tecnologiaService);

export const tecnologiaRoutes = Router();

tecnologiaRoutes.get("/tecnologias", tecnologiaController.findAll);

tecnologiaRoutes.get(
  "/tecnologias/:id",
  validate(tecnologiaIdParamSchema, "params"),
  tecnologiaController.findById,
);

tecnologiaRoutes.post(
  "/tecnologias",
  validate(createTecnologiaSchema),
  tecnologiaController.create,
);

tecnologiaRoutes.put(
  "/tecnologias/:id",
  validate(tecnologiaIdParamSchema, "params"),
  validate(updateTecnologiaSchema),
  tecnologiaController.update,
);

tecnologiaRoutes.delete(
  "/tecnologias/:id",
  validate(tecnologiaIdParamSchema, "params"),
  tecnologiaController.delete,
);