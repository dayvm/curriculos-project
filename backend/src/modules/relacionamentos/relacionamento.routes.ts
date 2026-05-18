import { Router } from "express";
import { validate } from "../../shared/middlewares/validate.middleware.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import { ProjetoRepository } from "../projetos/projeto.repository.js";
import { TecnologiaRepository } from "../tecnologias/tecnologia.repository.js";
import { RelacionamentoController } from "./relacionamento.controller.js";
import {
  curriculoTecnologiaParamSchema,
  projetoTecnologiaParamSchema,
} from "./relacionamento.dto.js";
import { RelacionamentoRepository } from "./relacionamento.repository.js";
import { RelacionamentoService } from "./relacionamento.service.js";

const relacionamentoRepository = new RelacionamentoRepository();
const curriculoRepository = new CurriculoRepository();
const projetoRepository = new ProjetoRepository();
const tecnologiaRepository = new TecnologiaRepository();

const relacionamentoService = new RelacionamentoService(
  relacionamentoRepository,
  curriculoRepository,
  projetoRepository,
  tecnologiaRepository,
);

const relacionamentoController = new RelacionamentoController(
  relacionamentoService,
);

export const relacionamentoRoutes = Router();

relacionamentoRoutes.post(
  "/curriculos/:curriculoId/tecnologias/:tecnologiaId",
  validate(curriculoTecnologiaParamSchema, "params"),
  relacionamentoController.attachTecnologiaToCurriculo,
);

relacionamentoRoutes.delete(
  "/curriculos/:curriculoId/tecnologias/:tecnologiaId",
  validate(curriculoTecnologiaParamSchema, "params"),
  relacionamentoController.detachTecnologiaFromCurriculo,
);

relacionamentoRoutes.post(
  "/projetos/:projetoId/tecnologias/:tecnologiaId",
  validate(projetoTecnologiaParamSchema, "params"),
  relacionamentoController.attachTecnologiaToProjeto,
);

relacionamentoRoutes.delete(
  "/projetos/:projetoId/tecnologias/:tecnologiaId",
  validate(projetoTecnologiaParamSchema, "params"),
  relacionamentoController.detachTecnologiaFromProjeto,
);