import { AppError } from "../../shared/errors/AppError.js";
import { ErrorCode } from "../../shared/errors/error-code.js";
import type {
  CreateTecnologiaDTO,
  UpdateTecnologiaDTO,
} from "./tecnologia.dto.js";
import { TecnologiaRepository } from "./tecnologia.repository.js";

export class TecnologiaService {
  constructor(private readonly tecnologiaRepository: TecnologiaRepository) {}

  async findAll() {
    return this.tecnologiaRepository.findAll();
  }

  async findById(id: string) {
    const tecnologia = await this.tecnologiaRepository.findById(id);

    if (!tecnologia) {
      throw new AppError({
        message: "Tecnologia nao encontrada.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    return tecnologia;
  }

  async create(data: CreateTecnologiaDTO) {
    const normalizedNome = data.nome.trim();

    const tecnologiaByNome =
      await this.tecnologiaRepository.findByNome(normalizedNome);

    if (tecnologiaByNome) {
      throw new AppError({
        message: "Ja existe uma tecnologia com este nome.",
        statusCode: 409,
        errorCode: ErrorCode.CONFLICT,
      });
    }

    return this.tecnologiaRepository.create({
      ...data,
      nome: normalizedNome,
    });
  }

  async update(id: string, data: UpdateTecnologiaDTO) {
    await this.findById(id);

    if (data.nome) {
      const normalizedNome = data.nome.trim();
      const tecnologiaByNome =
        await this.tecnologiaRepository.findByNome(normalizedNome);

      if (tecnologiaByNome && tecnologiaByNome.id !== id) {
        throw new AppError({
          message: "Ja existe uma tecnologia com este nome.",
          statusCode: 409,
          errorCode: ErrorCode.CONFLICT,
        });
      }

      data.nome = normalizedNome;
    }

    return this.tecnologiaRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.tecnologiaRepository.delete(id);
  }
}