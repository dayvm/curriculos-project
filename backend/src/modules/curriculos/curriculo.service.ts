import { AppError } from "../../shared/errors/AppError.js";
import { ErrorCode } from "../../shared/errors/error-code.js";
import type {
  CreateCurriculoDTO,
  UpdateCurriculoDTO,
} from "./curriculo.dto.js";
import { CurriculoRepository } from "./curriculo.repository.js";

type CurriculoCompleto = NonNullable<
  Awaited<ReturnType<CurriculoRepository["findCompleteById"]>>
>;

export class CurriculoService {
  constructor(private readonly curriculoRepository: CurriculoRepository) {}

  async findAll() {
    return this.curriculoRepository.findAll();
  }

  async findById(id: string) {
    const curriculo = await this.curriculoRepository.findById(id);

    if (!curriculo) {
      throw new AppError({
        message: "Curriculo nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    return curriculo;
  }

  async findCompleteById(id: string) {
    const curriculo = await this.curriculoRepository.findCompleteById(id);

    if (!curriculo) {
      throw new AppError({
        message: "Curriculo nao encontrado.",
        statusCode: 404,
        errorCode: ErrorCode.NOT_FOUND,
      });
    }

    return this.serializeComplete(curriculo);
  }

  async create(data: CreateCurriculoDTO) {
    const normalizedEmail = data.email.trim().toLowerCase();

    const curriculoByEmail =
      await this.curriculoRepository.findByEmail(normalizedEmail);

    if (curriculoByEmail) {
      throw new AppError({
        message: "Ja existe um curriculo com este email.",
        statusCode: 409,
        errorCode: ErrorCode.CONFLICT,
      });
    }

    return this.curriculoRepository.create({
      ...data,
      email: normalizedEmail,
    });
  }

  async update(id: string, data: UpdateCurriculoDTO) {
    await this.findById(id);

    if (data.email) {
      const normalizedEmail = data.email.trim().toLowerCase();
      const curriculoByEmail =
        await this.curriculoRepository.findByEmail(normalizedEmail);

      if (curriculoByEmail && curriculoByEmail.id !== id) {
        throw new AppError({
          message: "Ja existe um curriculo com este email.",
          statusCode: 409,
          errorCode: ErrorCode.CONFLICT,
        });
      }

      data.email = normalizedEmail;
    }

    return this.curriculoRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.curriculoRepository.delete(id);
  }

  private serializeComplete(curriculo: CurriculoCompleto) {
    return {
      ...curriculo,
      tecnologias: curriculo.tecnologias.map((item) => item.tecnologia),
      projetos: curriculo.projetos.map((projeto) => ({
        ...projeto,
        tecnologias: projeto.tecnologias.map((item) => item.tecnologia),
      })),
    };
  }
}
