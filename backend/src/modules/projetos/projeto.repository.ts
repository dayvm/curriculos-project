import type { Prisma, Projeto, ProjetoTecnologia, Tecnologia } from "@prisma/client";
import { prisma } from "../../prisma/prisma.client.js";
import type { CreateProjetoDTO, UpdateProjetoDTO } from "./projeto.dto.js";

export type ProjetoTecnologiaCompleta = ProjetoTecnologia & {
  tecnologia: Tecnologia;
};

export type ProjetoCompleto = Projeto & {
  tecnologias: ProjetoTecnologiaCompleta[];
};

export class ProjetoRepository {
  async findByCurriculo(curriculoId: string) {
    return prisma.projeto.findMany({
      where: { curriculoId },
      orderBy: {
        criadoEm: "desc",
      },
    });
  }

  async findById(id: string): Promise<ProjetoCompleto | null> {
    return prisma.projeto.findUnique({
      where: { id },
      include: {
        tecnologias: {
          include: {
            tecnologia: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.projeto.findUnique({
      where: { slug },
    });
  }

  async create(curriculoId: string, data: CreateProjetoDTO) {
    const prismaData: Prisma.ProjetoCreateInput = {
      curriculo: {
        connect: {
          id: curriculoId,
        },
      },
      slug: data.slug,
      titulo: data.titulo,
      descricaoCurta: data.descricaoCurta,
      descricaoLonga: data.descricaoLonga,
      tipo: data.tipo,
      ...(data.imagemUrl !== undefined ? { imagemUrl: data.imagemUrl } : {}),
      ...(data.githubUrl !== undefined ? { githubUrl: data.githubUrl } : {}),
      ...(data.demoUrl !== undefined ? { demoUrl: data.demoUrl } : {}),
      ...(data.instituicao !== undefined ? { instituicao: data.instituicao } : {}),
    };

    return prisma.projeto.create({
      data: prismaData,
    });
  }

  async update(id: string, data: UpdateProjetoDTO) {
    const prismaData: Prisma.ProjetoUpdateInput = {
      ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.titulo !== undefined ? { titulo: data.titulo } : {}),
      ...(data.descricaoCurta !== undefined
        ? { descricaoCurta: data.descricaoCurta }
        : {}),
      ...(data.descricaoLonga !== undefined
        ? { descricaoLonga: data.descricaoLonga }
        : {}),
      ...(data.imagemUrl !== undefined ? { imagemUrl: data.imagemUrl } : {}),
      ...(data.githubUrl !== undefined ? { githubUrl: data.githubUrl } : {}),
      ...(data.demoUrl !== undefined ? { demoUrl: data.demoUrl } : {}),
      ...(data.tipo !== undefined ? { tipo: data.tipo } : {}),
      ...(data.instituicao !== undefined ? { instituicao: data.instituicao } : {}),
    };

    return prisma.projeto.update({
      where: { id },
      data: prismaData,
    });
  }

  async delete(id: string) {
    return prisma.projeto.delete({
      where: { id },
    });
  }
}