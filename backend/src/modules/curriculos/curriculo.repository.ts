import type {
  Curriculo,
  CurriculoTecnologia,
  ExperienciaAcademica,
  ExperienciaProfissional,
  Projeto,
  ProjetoTecnologia,
  Tecnologia,
} from "@prisma/client";
import { prisma } from "../../prisma/prisma.client.js";
import type {
  CreateCurriculoDTO,
  UpdateCurriculoDTO,
} from "./curriculo.dto.js";
import type { Prisma } from "@prisma/client";

export type CurriculoTecnologiaCompleta = CurriculoTecnologia & {
  tecnologia: Tecnologia;
};

export type ProjetoTecnologiaCompleta = ProjetoTecnologia & {
  tecnologia: Tecnologia;
};

export type ProjetoCompleto = Projeto & {
  tecnologias: ProjetoTecnologiaCompleta[];
};

export type CurriculoCompleto = Curriculo & {
  experienciasAcademicas: ExperienciaAcademica[];
  experienciasProfissionais: ExperienciaProfissional[];
  projetos: ProjetoCompleto[];
  tecnologias: CurriculoTecnologiaCompleta[];
};

export class CurriculoRepository {
  async findAll() {
    return prisma.curriculo.findMany({
      orderBy: {
        nome: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.curriculo.findUnique({
      where: { id },
    });
  }

  async findCompleteById(id: string): Promise<CurriculoCompleto | null> {
    return prisma.curriculo.findUnique({
      where: { id },
      include: {
        experienciasAcademicas: {
          orderBy: {
            dataInicio: "desc",
          },
        },
        experienciasProfissionais: {
          orderBy: {
            dataInicio: "desc",
          },
        },
        projetos: {
          orderBy: {
            criadoEm: "desc",
          },
          include: {
            tecnologias: {
              include: {
                tecnologia: true,
              },
            },
          },
        },
        tecnologias: {
          include: {
            tecnologia: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.curriculo.findUnique({
      where: { email },
    });
  }

  async create(data: CreateCurriculoDTO) {
  const prismaData: Prisma.CurriculoCreateInput = {
    nome: data.nome,
    titulo: data.titulo,
    resumo: data.resumo,
    email: data.email,
    ...(data.telefone !== undefined ? { telefone: data.telefone } : {}),
    ...(data.fotoUrl !== undefined ? { fotoUrl: data.fotoUrl } : {}),
    ...(data.status !== undefined ? { status: data.status } : {}),
  };

  return prisma.curriculo.create({
    data: prismaData,
  });
}

async update(id: string, data: UpdateCurriculoDTO) {
  const prismaData: Prisma.CurriculoUpdateInput = {
    ...(data.nome !== undefined ? { nome: data.nome } : {}),
    ...(data.titulo !== undefined ? { titulo: data.titulo } : {}),
    ...(data.resumo !== undefined ? { resumo: data.resumo } : {}),
    ...(data.email !== undefined ? { email: data.email } : {}),
    ...(data.telefone !== undefined ? { telefone: data.telefone } : {}),
    ...(data.fotoUrl !== undefined ? { fotoUrl: data.fotoUrl } : {}),
    ...(data.status !== undefined ? { status: data.status } : {}),
  };

  return prisma.curriculo.update({
    where: { id },
    data: prismaData,
  });
}

  async delete(id: string) {
    return prisma.curriculo.delete({
      where: { id },
    });
  }
}
