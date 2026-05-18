import type { Request, Response } from "express";
import type {
  CreateProjetoDTO,
  CurriculoIdParamDTO,
  ProjetoIdParamDTO,
  UpdateProjetoDTO,
} from "./projeto.dto.js";
import { ProjetoService } from "./projeto.service.js";

export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  findByCurriculo = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const projetos = await this.projetoService.findByCurriculo(curriculoId);

    return res.status(200).json({
      success: true,
      message: "Projetos encontrados com sucesso.",
      data: projetos,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as ProjetoIdParamDTO;
    const projeto = await this.projetoService.findById(id);

    return res.status(200).json({
      success: true,
      message: "Projeto encontrado com sucesso.",
      data: projeto,
    });
  };

  create = async (req: Request, res: Response) => {
    const { curriculoId } = req.params as CurriculoIdParamDTO;
    const data = req.body as CreateProjetoDTO;

    const projeto = await this.projetoService.create(curriculoId, data);

    return res.status(201).json({
      success: true,
      message: "Projeto criado com sucesso.",
      data: projeto,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as ProjetoIdParamDTO;
    const data = req.body as UpdateProjetoDTO;

    const projeto = await this.projetoService.update(id, data);

    return res.status(200).json({
      success: true,
      message: "Projeto atualizado com sucesso.",
      data: projeto,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as ProjetoIdParamDTO;

    await this.projetoService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Projeto removido com sucesso.",
      data: null,
    });
  };
}