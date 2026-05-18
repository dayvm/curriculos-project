import type { Request, Response } from "express";
import type {
  CreateCurriculoDTO,
  CurriculoIdParamDTO,
  UpdateCurriculoDTO,
} from "./curriculo.dto.js";
import { CurriculoService } from "./curriculo.service.js";

export class CurriculoController {
  constructor(private readonly curriculoService: CurriculoService) {}

  findAll = async (_req: Request, res: Response) => {
    const curriculos = await this.curriculoService.findAll();

    return res.status(200).json({
      success: true,
      message: "Curriculos encontrados com sucesso.",
      data: curriculos,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as CurriculoIdParamDTO;
    const curriculo = await this.curriculoService.findById(id);

    return res.status(200).json({
      success: true,
      message: "Curriculo encontrado com sucesso.",
      data: curriculo,
    });
  };

  findCompleteById = async (req: Request, res: Response) => {
    const { id } = req.params as CurriculoIdParamDTO;
    const curriculo = await this.curriculoService.findCompleteById(id);

    return res.status(200).json({
      success: true,
      message: "Curriculo completo encontrado com sucesso.",
      data: curriculo,
    });
  };

  create = async (req: Request, res: Response) => {
    const data = req.body as CreateCurriculoDTO;
    const curriculo = await this.curriculoService.create(data);

    return res.status(201).json({
      success: true,
      message: "Curriculo criado com sucesso.",
      data: curriculo,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as CurriculoIdParamDTO;
    const data = req.body as UpdateCurriculoDTO;
    const curriculo = await this.curriculoService.update(id, data);

    return res.status(200).json({
      success: true,
      message: "Curriculo atualizado com sucesso.",
      data: curriculo,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as CurriculoIdParamDTO;

    await this.curriculoService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Curriculo removido com sucesso.",
      data: null,
    });
  };
}
