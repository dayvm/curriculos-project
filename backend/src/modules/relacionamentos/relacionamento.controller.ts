import type { Request, Response } from "express";
import type {
  CurriculoTecnologiaParamDTO,
  ProjetoTecnologiaParamDTO,
} from "./relacionamento.dto.js";
import { RelacionamentoService } from "./relacionamento.service.js";

export class RelacionamentoController {
  constructor(
    private readonly relacionamentoService: RelacionamentoService,
  ) {}

  attachTecnologiaToCurriculo = async (req: Request, res: Response) => {
    const { curriculoId, tecnologiaId } =
      req.params as CurriculoTecnologiaParamDTO;

    const relation =
      await this.relacionamentoService.attachTecnologiaToCurriculo(
        curriculoId,
        tecnologiaId,
      );

    return res.status(201).json({
      success: true,
      message: "Tecnologia vinculada ao curriculo com sucesso.",
      data: relation,
    });
  };

  detachTecnologiaFromCurriculo = async (req: Request, res: Response) => {
    const { curriculoId, tecnologiaId } =
      req.params as CurriculoTecnologiaParamDTO;

    await this.relacionamentoService.detachTecnologiaFromCurriculo(
      curriculoId,
      tecnologiaId,
    );

    return res.status(200).json({
      success: true,
      message: "Tecnologia removida do curriculo com sucesso.",
      data: null,
    });
  };

  attachTecnologiaToProjeto = async (req: Request, res: Response) => {
    const { projetoId, tecnologiaId } =
      req.params as ProjetoTecnologiaParamDTO;

    const relation =
      await this.relacionamentoService.attachTecnologiaToProjeto(
        projetoId,
        tecnologiaId,
      );

    return res.status(201).json({
      success: true,
      message: "Tecnologia vinculada ao projeto com sucesso.",
      data: relation,
    });
  };

  detachTecnologiaFromProjeto = async (req: Request, res: Response) => {
    const { projetoId, tecnologiaId } =
      req.params as ProjetoTecnologiaParamDTO;

    await this.relacionamentoService.detachTecnologiaFromProjeto(
      projetoId,
      tecnologiaId,
    );

    return res.status(200).json({
      success: true,
      message: "Tecnologia removida do projeto com sucesso.",
      data: null,
    });
  };
}