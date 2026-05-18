import { prisma } from "../../prisma/prisma.client.js";

export type CreateExperienciaProfissionalData = {
  curriculoId: string;
  empresa: string;
  cargo: string;
  dataInicio: Date;
  dataFim?: Date | null;
};

export type UpdateExperienciaProfissionalData = {
  empresa?: string;
  cargo?: string;
  dataInicio?: Date;
  dataFim?: Date | null;
};

export class ExperienciaProfissionalRepository {
  async findByCurriculo(curriculoId: string) {
    return prisma.experienciaProfissional.findMany({
      where: { curriculoId },
      orderBy: {
        dataInicio: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.experienciaProfissional.findUnique({
      where: { id },
    });
  }

  async create(data: CreateExperienciaProfissionalData) {
    return prisma.experienciaProfissional.create({
      data: {
        curriculoId: data.curriculoId,
        empresa: data.empresa,
        cargo: data.cargo,
        dataInicio: data.dataInicio,
        ...(data.dataFim !== undefined ? { dataFim: data.dataFim } : {}),
      },
    });
  }

  async update(id: string, data: UpdateExperienciaProfissionalData) {
    return prisma.experienciaProfissional.update({
      where: { id },
      data: {
        ...(data.empresa !== undefined ? { empresa: data.empresa } : {}),
        ...(data.cargo !== undefined ? { cargo: data.cargo } : {}),
        ...(data.dataInicio !== undefined ? { dataInicio: data.dataInicio } : {}),
        ...(data.dataFim !== undefined ? { dataFim: data.dataFim } : {}),
      },
    });
  }

  async delete(id: string) {
    return prisma.experienciaProfissional.delete({
      where: { id },
    });
  }
}