import { AppError } from "../../shared/errors/AppError.js";
import { ErrorCode } from "../../shared/errors/error-code.js";
import { CurriculoRepository } from "../curriculos/curriculo.repository.js";
import { ProjetoRepository } from "../projetos/projeto.repository.js";
import { TecnologiaRepository } from "../tecnologias/tecnologia.repository.js";
import { RelacionamentoRepository } from "./relacionamento.repository.js";

export class RelacionamentoService {
  constructor(
    private readonly relacionamentoRepository: RelacionamentoRepository,
    private readonly curriculoRepository: CurriculoRepository,
    private readonly projetoRepository: ProjetoRepository,
    private readonly tecnologiaRepository: TecnologiaRepository,
  ) {}

  async attachTecnologiaToCurriculo(
    curriculoId: string,
    tecnologiaId: string,
  ) {
    await this.ensureCurriculoExists(curriculoId);
    await this.ensureTecnologiaExists(tecnologiaId);

    const existingRelation =
      await this.relacionamentoRepository.findCurriculoTecnologia(
        curriculoId,
        tecnologiaId,
      );

    if (existingRelation) {
      throw new AppError({
        message: "Tecnologia ja vinculada ao curriculo.",
        statusCode: 409,
        errorCode: ErrorCode.CONFLICT,
      });
    }

    return this.relacionamentoRepository.attachTecnologiaToCurriculo(
      curriculoId,
      tecnologiaId,
    );
  }

  async detachTecnologiaFromCurriculo(
    curriculoId: string,
    tecnologiaId: string,
  ) {
    await this.ensureCurriculoExists(curriculoId);
    await this.ensureTecnologiaExists(tecnologiaId);

    const existingRelation =
      await this.relacionamentoRepository.findCurriculoTecnologia(
        curriculoId,
        tecnologiaId,
      );

    if (!existingRelation) {
      throw new AppError({
        message: "Vinculo entre curriculo e tecnologia nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    await this.relacionamentoRepository.detachTecnologiaFromCurriculo(
      curriculoId,
      tecnologiaId,
    );
  }

  async attachTecnologiaToProjeto(
    projetoId: string,
    tecnologiaId: string,
  ) {
    await this.ensureProjetoExists(projetoId);
    await this.ensureTecnologiaExists(tecnologiaId);

    const existingRelation =
      await this.relacionamentoRepository.findProjetoTecnologia(
        projetoId,
        tecnologiaId,
      );

    if (existingRelation) {
      throw new AppError({
        message: "Tecnologia ja vinculada ao projeto.",
        statusCode: 409,
        errorCode: ErrorCode.CONFLICT,
      });
    }

    return this.relacionamentoRepository.attachTecnologiaToProjeto(
      projetoId,
      tecnologiaId,
    );
  }

  async detachTecnologiaFromProjeto(
    projetoId: string,
    tecnologiaId: string,
  ) {
    await this.ensureProjetoExists(projetoId);
    await this.ensureTecnologiaExists(tecnologiaId);

    const existingRelation =
      await this.relacionamentoRepository.findProjetoTecnologia(
        projetoId,
        tecnologiaId,
      );

    if (!existingRelation) {
      throw new AppError({
        message: "Vinculo entre projeto e tecnologia nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    await this.relacionamentoRepository.detachTecnologiaFromProjeto(
      projetoId,
      tecnologiaId,
    );
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

  private async ensureProjetoExists(projetoId: string) {
    const projeto = await this.projetoRepository.findById(projetoId);

    if (!projeto) {
      throw new AppError({
        message: "Projeto nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }
  }

  private async ensureTecnologiaExists(tecnologiaId: string) {
    const tecnologia = await this.tecnologiaRepository.findById(tecnologiaId);

    if (!tecnologia) {
      throw new AppError({
        message: "Tecnologia nao encontrada.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }
  }
}