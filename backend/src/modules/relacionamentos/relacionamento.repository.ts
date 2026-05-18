import { prisma } from "../../prisma/prisma.client.js";

export class RelacionamentoRepository {
  async findCurriculoTecnologia(
    curriculoId: string,
    tecnologiaId: string,
  ) {
    return prisma.curriculoTecnologia.findUnique({
      where: {
        curriculoId_tecnologiaId: {
          curriculoId,
          tecnologiaId,
        },
      },
    });
  }

  async attachTecnologiaToCurriculo(
    curriculoId: string,
    tecnologiaId: string,
  ) {
    return prisma.curriculoTecnologia.create({
      data: {
        curriculoId,
        tecnologiaId,
      },
    });
  }

  async detachTecnologiaFromCurriculo(
    curriculoId: string,
    tecnologiaId: string,
  ) {
    return prisma.curriculoTecnologia.delete({
      where: {
        curriculoId_tecnologiaId: {
          curriculoId,
          tecnologiaId,
        },
      },
    });
  }

  async findProjetoTecnologia(
    projetoId: string,
    tecnologiaId: string,
  ) {
    return prisma.projetoTecnologia.findUnique({
      where: {
        projetoId_tecnologiaId: {
          projetoId,
          tecnologiaId,
        },
      },
    });
  }

  async attachTecnologiaToProjeto(
    projetoId: string,
    tecnologiaId: string,
  ) {
    return prisma.projetoTecnologia.create({
      data: {
        projetoId,
        tecnologiaId,
      },
    });
  }

  async detachTecnologiaFromProjeto(
    projetoId: string,
    tecnologiaId: string,
  ) {
    return prisma.projetoTecnologia.delete({
      where: {
        projetoId_tecnologiaId: {
          projetoId,
          tecnologiaId,
        },
      },
    });
  }
}