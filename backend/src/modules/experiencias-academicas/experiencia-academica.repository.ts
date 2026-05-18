import { prisma } from "../../prisma/prisma.client.js";

export type CreateExperienciaAcademicaData = {
  curriculoId: string;
  instituicao: string;
  curso: string;
  dataInicio: Date;
  dataFim?: Date | null;
};

export type UpdateExperienciaAcademicaData = {
  instituicao?: string;
  curso?: string;
  dataInicio?: Date;
  dataFim?: Date | null;
};

export class ExperienciaAcademicaRepository {
  async findByCurriculo(curriculoId: string) {
    return prisma.experienciaAcademica.findMany({
      where: { curriculoId },
      orderBy: {
        dataInicio: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.experienciaAcademica.findUnique({
      where: { id },
    });
  }

  async create(data: CreateExperienciaAcademicaData) {
    return prisma.experienciaAcademica.create({
      data: {
        curriculoId: data.curriculoId,
        instituicao: data.instituicao,
        curso: data.curso,
        dataInicio: data.dataInicio,
        ...(data.dataFim !== undefined ? { dataFim: data.dataFim } : {}),
      },
    });
  }

  async update(id: string, data: UpdateExperienciaAcademicaData) {
    return prisma.experienciaAcademica.update({
      where: { id },
      data: {
        ...(data.instituicao !== undefined
          ? { instituicao: data.instituicao }
          : {}),
        ...(data.curso !== undefined ? { curso: data.curso } : {}),
        ...(data.dataInicio !== undefined ? { dataInicio: data.dataInicio } : {}),
        ...(data.dataFim !== undefined ? { dataFim: data.dataFim } : {}),
      },
    });
  }

  async delete(id: string) {
    return prisma.experienciaAcademica.delete({
      where: { id },
    });
  }
}