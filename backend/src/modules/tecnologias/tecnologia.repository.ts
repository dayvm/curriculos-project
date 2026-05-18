import type { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma.client.js";
import type {
  CreateTecnologiaDTO,
  UpdateTecnologiaDTO,
} from "./tecnologia.dto.js";

export class TecnologiaRepository {
  async findAll() {
    return prisma.tecnologia.findMany({
      orderBy: {
        nome: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.tecnologia.findUnique({
      where: { id },
    });
  }

  async findByNome(nome: string) {
    return prisma.tecnologia.findUnique({
      where: { nome },
    });
  }

  async create(data: CreateTecnologiaDTO) {
    const prismaData: Prisma.TecnologiaCreateInput = {
      nome: data.nome,
      ...(data.descricao !== undefined ? { descricao: data.descricao } : {}),
      ...(data.categoria !== undefined ? { categoria: data.categoria } : {}),
    };

    return prisma.tecnologia.create({
      data: prismaData,
    });
  }

  async update(id: string, data: UpdateTecnologiaDTO) {
    const prismaData: Prisma.TecnologiaUpdateInput = {
      ...(data.nome !== undefined ? { nome: data.nome } : {}),
      ...(data.descricao !== undefined ? { descricao: data.descricao } : {}),
      ...(data.categoria !== undefined ? { categoria: data.categoria } : {}),
    };

    return prisma.tecnologia.update({
      where: { id },
      data: prismaData,
    });
  }

  async delete(id: string) {
    return prisma.tecnologia.delete({
      where: { id },
    });
  }
}