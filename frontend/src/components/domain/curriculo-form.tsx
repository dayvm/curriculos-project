import { useState } from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import {
  curriculoSchema,
  type CurriculoFormValues,
} from "@/features/curriculos/schemas/curriculo.schema";

type CurriculoFormProps = {
  initialValues?: Partial<CurriculoFormValues>;
  submitLabel: string;
  isPending?: boolean;
  errorMessage?: string;
  onSubmit: (values: CurriculoFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

type CurriculoFormState = {
  nome: string;
  titulo: string;
  resumo: string;
  email: string;
  telefone: string;
  fotoUrl: string;
  status: "ATIVO" | "INATIVO";
};

type FieldErrors = Partial<Record<keyof CurriculoFormState, string>>;

function toFormState(
  initialValues?: Partial<CurriculoFormValues>,
): CurriculoFormState {
  return {
    nome: initialValues?.nome ?? "",
    titulo: initialValues?.titulo ?? "",
    resumo: initialValues?.resumo ?? "",
    email: initialValues?.email ?? "",
    telefone: initialValues?.telefone ?? "",
    fotoUrl: initialValues?.fotoUrl ?? "",
    status: initialValues?.status ?? "ATIVO",
  };
}

export function CurriculoForm({
  initialValues,
  submitLabel,
  isPending = false,
  errorMessage,
  onSubmit,
  onCancel,
}: CurriculoFormProps) {
  const [values, setValues] = useState<CurriculoFormState>(
    toFormState(initialValues),
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  function updateField<K extends keyof CurriculoFormState>(
    field: K,
    value: CurriculoFormState[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit() {
    const parsed = curriculoSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof CurriculoFormState | undefined;

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
          placeholder="Nome completo"
          value={values.nome}
          onChangeText={(value) => updateField("nome", value)}
        />
        {errors.nome ? (
          <Text className="text-destructive text-sm">{errors.nome}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Titulo</Label>
        <Input
          placeholder="Ex: Desenvolvedor Full Stack"
          value={values.titulo}
          onChangeText={(value) => updateField("titulo", value)}
        />
        {errors.titulo ? (
          <Text className="text-destructive text-sm">{errors.titulo}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Resumo</Label>
        <Textarea
          placeholder="Resumo profissional"
          value={values.resumo}
          onChangeText={(value) => updateField("resumo", value)}
        />
        {errors.resumo ? (
          <Text className="text-destructive text-sm">{errors.resumo}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Email</Label>
        <Input
          placeholder="email@exemplo.com"
          value={values.email}
          onChangeText={(value) => updateField("email", value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? (
          <Text className="text-destructive text-sm">{errors.email}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Telefone</Label>
        <Input
          placeholder="(81) 99999-9999"
          value={values.telefone}
          onChangeText={(value) => updateField("telefone", value)}
        />
        {errors.telefone ? (
          <Text className="text-destructive text-sm">{errors.telefone}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Foto URL</Label>
        <Input
          placeholder="https://..."
          value={values.fotoUrl}
          onChangeText={(value) => updateField("fotoUrl", value)}
          autoCapitalize="none"
        />
        {errors.fotoUrl ? (
          <Text className="text-destructive text-sm">{errors.fotoUrl}</Text>
        ) : null}
      </View>

      <View className="gap-2">
        <Label>Status</Label>
        <View className="flex-row gap-2">
          <Button
            className="flex-1"
            variant={values.status === "ATIVO" ? "default" : "outline"}
            onPress={() => updateField("status", "ATIVO")}
          >
            <Text>Ativo</Text>
          </Button>

          <Button
            className="flex-1"
            variant={values.status === "INATIVO" ? "default" : "outline"}
            onPress={() => updateField("status", "INATIVO")}
          >
            <Text>Inativo</Text>
          </Button>
        </View>
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