import { AppError } from "../../shared/errors/AppError.js";
import { ErrorCode } from "../../shared/errors/error-code.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import type {
  CreateExperienciaProfissionalDTO,
  UpdateExperienciaProfissionalDTO,
} from "./experiencia-profissional.dto.js";
import {
  ExperienciaProfissionalRepository,
  type UpdateExperienciaProfissionalData,
} from "./experiencia-profissional.repository.js";

export class ExperienciaProfissionalService {
  constructor(
    private readonly experienciaProfissionalRepository: ExperienciaProfissionalRepository,
    private readonly curriculoRepository: CurriculoRepository,
  ) {}

  async findByCurriculo(curriculoId: string) {
    await this.ensureCurriculoExists(curriculoId);
    return this.experienciaProfissionalRepository.findByCurriculo(curriculoId);
  }

  async findById(id: string) {
    const experiencia = await this.experienciaProfissionalRepository.findById(id);

    if (!experiencia) {
      throw new AppError({
        message: "Experiencia profissional nao encontrada.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    return experiencia;
  }

  async create(
    curriculoId: string,
    data: CreateExperienciaProfissionalDTO,
  ) {
    await this.ensureCurriculoExists(curriculoId);

    const dataInicio = this.parseDate(data.dataInicio, "data inicial");
    const dataFim =
      data.dataFim === null || data.dataFim === undefined
        ? data.dataFim
        : this.parseDate(data.dataFim, "data final");

    this.validateDateRange(dataInicio, dataFim ?? null);

    return this.experienciaProfissionalRepository.create({
      curriculoId,
      empresa: data.empresa,
      cargo: data.cargo,
      dataInicio,
      ...(dataFim !== undefined ? { dataFim } : {}),
    });
  }

  async update(id: string, data: UpdateExperienciaProfissionalDTO) {
    const experiencia = await this.findById(id);

    const dataInicioBase =
      data.dataInicio ?? this.formatDate(experiencia.dataInicio);
    const dataFimBase =
      data.dataFim !== undefined
        ? data.dataFim
        : experiencia.dataFim
          ? this.formatDate(experiencia.dataFim)
          : null;

    const parsedDataInicio = this.parseDate(dataInicioBase, "data inicial");
    const parsedDataFim =
      dataFimBase === null ? null : this.parseDate(dataFimBase, "data final");

    this.validateDateRange(parsedDataInicio, parsedDataFim);

    const updateData: UpdateExperienciaProfissionalData = {
      ...(data.empresa !== undefined ? { empresa: data.empresa } : {}),
      ...(data.cargo !== undefined ? { cargo: data.cargo } : {}),
      ...(data.dataInicio !== undefined ? { dataInicio: parsedDataInicio } : {}),
      ...(data.dataFim !== undefined ? { dataFim: parsedDataFim } : {}),
    };

    return this.experienciaProfissionalRepository.update(id, updateData);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.experienciaProfissionalRepository.delete(id);
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

  private parseDate(value: string, fieldName: string) {
    const parsed = new Date(`${value}T00:00:00.000Z`);

    if (
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== value
    ) {
      throw new AppError({
        message: `A ${fieldName} informada e invalida.`,
        statusCode: 400,
        errorCode: ErrorCode.BAD_REQUEST,
      });
    }

    return parsed;
  }

  private validateDateRange(dataInicio: Date, dataFim: Date | null) {
    if (dataFim && dataFim < dataInicio) {
      throw new AppError({
        message: "A data final nao pode ser anterior a data inicial.",
        statusCode: 400,
        errorCode: ErrorCode.BAD_REQUEST,
      });
    }
  }

  private formatDate(value: Date) {
    return value.toISOString().slice(0, 10);
  }
}