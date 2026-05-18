import type { Request, Response } from "express";
import type {
  CreateExperienciaAcademicaDTO,
  CurriculoIdParamDTO,
  ExperienciaAcademicaIdParamDTO,
  UpdateExperienciaAcademicaDTO,
} from "./experiencia-academica.dto.js";
import { ExperienciaAcademicaService } from "./experiencia-academica.service.js";

export class ExperienciaAcademicaController {
  constructor(
    private readonly experienciaAcademicaService: ExperienciaAcademicaService,
  ) {}

  findByCurriculo = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const experiencias =
      await this.experienciaAcademicaService.findByCurriculo(curriculoId);

    return res.status(200).json({
      success: true,
      message: "Experiencias academicas encontradas com sucesso.",
      data: experiencias,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaAcademicaIdParamDTO;
    const experiencia = await this.experienciaAcademicaService.findById(id);

    return res.status(200).json({
      success: true,
      message: "Experiencia academica encontrada com sucesso.",
      data: experiencia,
    });
  };

  create = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const data = req.body as CreateExperienciaAcademicaDTO;

    const experiencia = await this.experienciaAcademicaService.create(
      curriculoId,
      data,
    );

    return res.status(201).json({
      success: true,
      message: "Experiencia academica criada com sucesso.",
      data: experiencia,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaAcademicaIdParamDTO;
    const data = req.body as UpdateExperienciaAcademicaDTO;

    const experiencia = await this.experienciaAcademicaService.update(id, data);

    return res.status(200).json({
      success: true,
      message: "Experiencia academica atualizada com sucesso.",
      data: experiencia,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as ExperienciaAcademicaIdParamDTO;

    await this.experienciaAcademicaService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Experiencia academica removida com sucesso.",
      data: null,
    });
  };
}