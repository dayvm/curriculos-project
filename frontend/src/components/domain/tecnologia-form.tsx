import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import {
  tecnologiaCategorias,
  tecnologiaSchema,
  type TecnologiaFormValues,
} from "@/features/tecnologias/schemas/tecnologia.schema";

type TecnologiaFormProps = {
  initialValues?: Partial<TecnologiaFormValues>;
  submitLabel: string;
  isPending?: boolean;
  errorMessage?: string;
  onSubmit: (values: TecnologiaFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

type TecnologiaFormState = {
  nome: string;
  descricao: string;
  categoria: (typeof tecnologiaCategorias)[number];
};

type FieldErrors = Partial<Record<keyof TecnologiaFormState, string>>;

function getCategoriaLabel(categoria: string) {
  switch (categoria) {
    case "BANCO_DE_DADOS":
      return "Banco de dados";
    default:
      return categoria.charAt(0) + categoria.slice(1).toLowerCase();
  }
}

function toFormState(
  initialValues?: Partial<TecnologiaFormValues>,
): TecnologiaFormState {
  return {
    nome: initialValues?.nome ?? "",
    descricao: initialValues?.descricao ?? "",
    categoria: initialValues?.categoria ?? "OUTRA",
  };
}

export function TecnologiaForm({
  initialValues,
  submitLabel,
  isPending = false,
  errorMessage,
  onSubmit,
  onCancel,
}: TecnologiaFormProps) {
  const [values, setValues] = useState<TecnologiaFormState>(
    toFormState(initialValues),
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  function updateField<K extends keyof TecnologiaFormState>(
    field: K,
    value: TecnologiaFormState[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit() {
    const parsed = tecnologiaSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof TecnologiaFormState | undefined;

        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});
    await onSubmit(parsed.data);
  }

  return (
    <View className="gap-4">
      {errorMessage ? (
        <Text className="text-destructive text-sm">{errorMessage}</Text>
      ) : null}

      <View className="gap-2">
        <Label>Nome</Label>
        <Input
          placeholder="Ex: React"
          value={values.nome}
          onChangeText={(value) => updateField("nome", value)}
        />
        {errors.nome ? (
          <Text className="text-destructive text-sm">{errors.nome}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Descricao</Label>
        <Textarea
          placeholder="Descricao opcional"
          value={values.descricao}
          onChangeText={(value) => updateField("descricao", value)}
        />
        {errors.descricao ? (
          <Text className="text-destructive text-sm">{errors.descricao}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Categoria</Label>

        <View className="flex-row flex-wrap gap-2">
          {tecnologiaCategorias.map((categoria) => (
            <Button
              key={categoria}
              variant={values.categoria === categoria ? "default" : "outline"}
              onPress={() => updateField("categoria", categoria)}
            >
              <Text>{getCategoriaLabel(categoria)}</Text>
            </Button>
          ))}
        </View>

        {errors.categoria ? (
          <Text className="text-destructive text-sm">{errors.categoria}</Text>
        ) : null}
      </View>

      <View className="flex-row gap-3 pt-2">
        {onCancel ? (
          <Button
            className="flex-1"
            variant="outline"
            onPress={onCancel}
            disabled={isPending}
          >
            <Text>Cancelar</Text>
          </Button>
        ) : null}

        <Button className="flex-1" onPress={handleSubmit} disabled={isPending}>
          <Text>{isPending ? "Salvando..." : submitLabel}</Text>
        </Button>
      </View>
    </View>
  );
}