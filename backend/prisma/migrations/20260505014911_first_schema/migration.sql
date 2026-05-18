-- CreateEnum
CREATE TYPE "StatusCurriculo" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "TipoProjeto" AS ENUM ('PROFISSIONAL', 'ACADEMICO', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "CategoriaTecnologia" AS ENUM ('LINGUAGEM', 'FRAMEWORK', 'BIBLIOTECA', 'BANCO_DE_DADOS', 'ORM', 'FERRAMENTA', 'PLATAFORMA', 'SERVICO', 'METODOLOGIA', 'OUTRA');

-- CreateTable
CREATE TABLE "curriculos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "titulo" VARCHAR(160) NOT NULL,
    "resumo" TEXT NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "telefone" VARCHAR(30),
    "foto_url" TEXT,
    "status" "StatusCurriculo" NOT NULL DEFAULT 'ATIVO',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curriculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias_academicas" (
    "id" UUID NOT NULL,
    "curriculo_id" UUID NOT NULL,
    "instituicao" VARCHAR(180) NOT NULL,
    "curso" VARCHAR(180) NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiencias_academicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias_profissionais" (
    "id" UUID NOT NULL,
    "curriculo_id" UUID NOT NULL,
    "empresa" VARCHAR(180) NOT NULL,
    "cargo" VARCHAR(180) NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiencias_profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projetos" (
    "id" UUID NOT NULL,
    "curriculo_id" UUID NOT NULL,
    "slug" VARCHAR(140) NOT NULL,
    "titulo" VARCHAR(180) NOT NULL,
    "descricao_curta" VARCHAR(280) NOT NULL,
    "descricao_longa" TEXT NOT NULL,
    "imagem_url" TEXT,
    "github_url" TEXT,
    "demo_url" TEXT,
    "tipo" "TipoProjeto" NOT NULL,
    "instituicao" VARCHAR(180),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecnologias" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "categoria" "CategoriaTecnologia" NOT NULL DEFAULT 'OUTRA',
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tecnologias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculos_tecnologias" (
    "curriculo_id" UUID NOT NULL,
    "tecnologia_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "curriculos_tecnologias_pkey" PRIMARY KEY ("curriculo_id","tecnologia_id")
);

-- CreateTable
CREATE TABLE "projetos_tecnologias" (
    "projeto_id" UUID NOT NULL,
    "tecnologia_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projetos_tecnologias_pkey" PRIMARY KEY ("projeto_id","tecnologia_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "curriculos_email_key" ON "curriculos"("email");

-- CreateIndex
CREATE INDEX "experiencias_academicas_curriculo_id_idx" ON "experiencias_academicas"("curriculo_id");

-- CreateIndex
CREATE INDEX "experiencias_profissionais_curriculo_id_idx" ON "experiencias_profissionais"("curriculo_id");

-- CreateIndex
CREATE UNIQUE INDEX "projetos_slug_key" ON "projetos"("slug");

-- CreateIndex
CREATE INDEX "projetos_curriculo_id_idx" ON "projetos"("curriculo_id");

-- CreateIndex
CREATE INDEX "projetos_tipo_idx" ON "projetos"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "tecnologias_nome_key" ON "tecnologias"("nome");

-- CreateIndex
CREATE INDEX "curriculos_tecnologias_tecnologia_id_idx" ON "curriculos_tecnologias"("tecnologia_id");

-- CreateIndex
CREATE INDEX "projetos_tecnologias_tecnologia_id_idx" ON "projetos_tecnologias"("tecnologia_id");

-- AddForeignKey
ALTER TABLE "experiencias_academicas" ADD CONSTRAINT "experiencias_academicas_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias_profissionais" ADD CONSTRAINT "experiencias_profissionais_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculos_tecnologias" ADD CONSTRAINT "curriculos_tecnologias_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculos_tecnologias" ADD CONSTRAINT "curriculos_tecnologias_tecnologia_id_fkey" FOREIGN KEY ("tecnologia_id") REFERENCES "tecnologias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos_tecnologias" ADD CONSTRAINT "projetos_tecnologias_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projetos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos_tecnologias" ADD CONSTRAINT "projetos_tecnologias_tecnologia_id_fkey" FOREIGN KEY ("tecnologia_id") REFERENCES "tecnologias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
