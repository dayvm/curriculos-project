import { useState } from "react";
import { View } from "react-native";

import { ScreenContainer } from "@/components/layout/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/loading-state";
import { Text } from "@/components/ui/text";

export default function HomeTab() {
  const [nome, setNome] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <ScreenContainer>
      <View className="gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Teste de componentes</CardTitle>
          </CardHeader>

          <CardContent className="gap-4">
            <Input
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />

            <Button onPress={() => setOpenConfirm(true)}>
              <Text>Abrir confirm dialog</Text>
            </Button>
          </CardContent>
        </Card>

        <LoadingState />

        <ErrorState
          title="Erro de teste"
          message="Isso aqui eh apenas validacao visual."
          onRetry={() => console.log("retry")}
        />

        <EmptyState
          title="Lista vazia"
          description="Ainda nao existe nenhum item cadastrado."
          actionLabel="Criar item"
          onAction={() => console.log("criar")}
        />
      </View>

      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Confirmar acao"
        description={`Nome digitado: ${nome || "vazio"}`}
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
        onConfirm={() => {
          console.log("confirmado");
          setOpenConfirm(false);
        }}
      />
    </ScreenContainer>
  );
}