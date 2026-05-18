import type { Request, Response } from "express";
import type {
  CreateExperienciaProfissionalDTO,
  CurriculoIdParamDTO,
  ExperienciaProfissionalIdParamDTO,
  UpdateExperienciaProfissionalDTO,
} from "./experiencia-profissional.dto.js";
import { ExperienciaProfissionalService } from "./experiencia-profissional.service.js";

export class ExperienciaProfissionalController {
  constructor(
    private readonly experienciaProfissionalService: ExperienciaProfissionalService,
  ) {}

  findByCurriculo = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const experiencias =
      await this.experienciaProfissionalService.findByCurriculo(curriculoId);

    return res.status(200).json({
      success: true,
      message: "Experiencias profissionais encontradas com sucesso.",
      data: experiencias,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaProfissionalIdParamDTO;
    const experiencia = await this.experienciaProfissionalService.findById(id);

    return res.status(200).json({
      success: true,
      message: "Experiencia profissional encontrada com sucesso.",
      data: experiencia,
    });
  };

  create = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const data = req.body as CreateExperienciaProfissionalDTO;

    const experiencia = await this.experienciaProfissionalService.create(
      curriculoId,
      data,
    );

    return res.status(201).json({
      success: true,
      message: "Experiencia profissional criada com sucesso.",
      data: experiencia,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaProfissionalIdParamDTO;
    const data = req.body as UpdateExperienciaProfissionalDTO;

    const experiencia = await this.experienciaProfissionalService.update(
      id,
      data,
    );

    return res.status(200).json({
      success: true,
      message: "Experiencia profissional atualizada com sucesso.",
      data: experiencia,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaProfissionalIdParamDTO;

    await this.experienciaProfissionalService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Experiencia profissional removida com sucesso.",
      data: null,
    });
  };
}