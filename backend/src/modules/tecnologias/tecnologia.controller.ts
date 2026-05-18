import type { Request, Response } from "express";
import type {
  CreateTecnologiaDTO,
  TecnologiaIdParamDTO,
  UpdateTecnologiaDTO,
} from "./tecnologia.dto.js";
import { TecnologiaService } from "./tecnologia.service.js";

export class TecnologiaController {
  constructor(private readonly tecnologiaService: TecnologiaService) {}

  findAll = async (_req: Request, res: Response) => {
    const tecnologias = await this.tecnologiaService.findAll();

    return res.status(200).json({
      success: true,
      message: "Tecnologias encontradas com sucesso.",
      data: tecnologias,
    });
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params as TecnologiaIdParamDTO;
    const tecnologia = await this.tecnologiaService.findById(id);

    return res.status(200).json({
      success: true,
      message: "Tecnologia encontrada com sucesso.",
      data: tecnologia,
    });
  };

  create = async (req: Request, res: Response) => {
    const data = req.body as CreateTecnologiaDTO;
    const tecnologia = await this.tecnologiaService.create(data);

    return res.status(201).json({
      success: true,
      message: "Tecnologia criada com sucesso.",
      data: tecnologia,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params as TecnologiaIdParamDTO;
    const data = req.body as UpdateTecnologiaDTO;
    const tecnologia = await this.tecnologiaService.update(id, data);

    return res.status(200).json({
      success: true,
      message: "Tecnologia atualizada com sucesso.",
      data: tecnologia,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params as TecnologiaIdParamDTO;

    await this.tecnologiaService.delete(id);

    return res.status(200).json({
      success: true,
      message: "Tecnologia removida com sucesso.",
      data: null,
    });
  };
}