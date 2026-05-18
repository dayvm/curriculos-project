import { AppError } from "../../shared/errors/AppError.js";
import { ErrorCode } from "../../shared/errors/error-code.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import type { CreateProjetoDTO, UpdateProjetoDTO } from "./projeto.dto.js";
import { ProjetoRepository, type ProjetoCompleto } from "./projeto.repository.js";

export class ProjetoService {
  constructor(
    private readonly projetoRepository: ProjetoRepository,
    private readonly curriculoRepository: CurriculoRepository,
  ) {}

  async findByCurriculo(curriculoId: string) {
    await this.ensureCurriculoExists(curriculoId);
    return this.projetoRepository.findByCurriculo(curriculoId);
  }

  async findById(id: string) {
    const projeto = await this.projetoRepository.findById(id);

    if (!projeto) {
      throw new AppError({
        message: "Projeto nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    return this.serializeProjeto(projeto);
  }

  async create(curriculoId: string, data: CreateProjetoDTO) {
    await this.ensureCurriculoExists(curriculoId);

    const normalizedSlug = this.normalizeSlug(data.slug);
    await this.ensureSlugIsAvailable(normalizedSlug);

    return this.projetoRepository.create(curriculoId, {
      ...data,
      slug: normalizedSlug,
    });
  }

  async update(id: string, data: UpdateProjetoDTO) {
    await this.findById(id);

    if (data.slug) {
      const normalizedSlug = this.normalizeSlug(data.slug);
      const projetoBySlug = await this.projetoRepository.findBySlug(normalizedSlug);

      if (projetoBySlug && projetoBySlug.id !== id) {
        throw new AppError({
          message: "Ja existe um projeto com este slug.",
          statusCode: 409,
          errorCode: ErrorCode.CONFLICT,
        });
      }

      data.slug = normalizedSlug;
    }

    return this.projetoRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.projetoRepository.delete(id);
  }

  private async ensureCurriculoExists(curriculoId: string) {
    const curriculo = await this.curriculoRepository.findById(curriculoId);

    if (!curriculo) {
      throw new AppError({
        message: "Curriculo nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }
  }

  private async ensureSlugIsAvailable(slug: string) {
    const projetoBySlug = await this.projetoRepository.findBySlug(slug);

    if (projetoBySlug) {
      throw new AppError({
        message: "Ja existe um projeto com este slug.",
        statusCode: 409,
        errorCode: ErrorCode.CONFLICT,
      });
    }
  }

  private normalizeSlug(slug: string) {
    return slug.trim().toLowerCase();
  }

  private serializeProjeto(projeto: ProjetoCompleto) {
    return {
      ...projeto,
      tecnologias: projeto.tecnologias.map((item) => item.tecnologia),
    };
  }
}