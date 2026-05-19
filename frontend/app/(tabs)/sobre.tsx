import { View } from "react-native";

import { ScreenContainer } from "@/components/layout/screen-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

const frontendStack = [
  "React Native",
  "Expo",
  "Expo Router",
  "TypeScript",
  "Axios",
  "TanStack Query",
  "Zustand",
  "NativeWind",
  "React Native Reusables",
];

const backendStack = [
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
  "NeonDB",
  "Vercel",
];

const modulos = [
  "Curriculos",
  "Experiencias academicas",
  "Experiencias profissionais",
  "Projetos",
  "Tecnologias",
];

export default function SobreTab() {
  return (
    <ScreenContainer>
      <View className="gap-5">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Sobre</Text>
          <Text className="text-muted-foreground">
            Informacoes do aplicativo, tecnologias utilizadas e funcionalidade extra.
          </Text>
        </View>

        <Card>
          <CardHeader>
            <CardTitle>Aplicativo</CardTitle>
          </CardHeader>

          <CardContent className="gap-3">
            <Text className="text-muted-foreground">
              Este aplicativo apresenta um curriculo/portfolio consumindo dados reais
              de uma API REST propria.
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {modulos.map((item) => (
                <Badge key={item} variant="outline">
                  <Text>{item}</Text>
                </Badge>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tecnologias do Frontend</CardTitle>
          </CardHeader>

          <CardContent>
            <View className="flex-row flex-wrap gap-2">
              {frontendStack.map((item) => (
                <Badge key={item} variant="secondary">
                  <Text>{item}</Text>
                </Badge>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tecnologias do Backend</CardTitle>
          </CardHeader>

          <CardContent>
            <View className="flex-row flex-wrap gap-2">
              {backendStack.map((item) => (
                <Badge key={item} variant="secondary">
                  <Text>{item}</Text>
                </Badge>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidade Extra</CardTitle>
          </CardHeader>

          <CardContent className="gap-3">
            <Text className="font-medium">Anotacao local por curriculo</Text>
            <Text className="text-muted-foreground">
              O app permite salvar uma anotacao privada no dispositivo para cada
              curriculo selecionado, sem enviar esse conteudo para a API.
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navegacao</CardTitle>
          </CardHeader>

          <CardContent className="gap-2">
            <Text className="text-muted-foreground">
              Home: selecao e visualizacao de curriculos.
            </Text>
            <Text className="text-muted-foreground">
              Academico: experiencias academicas do curriculo selecionado.
            </Text>
            <Text className="text-muted-foreground">
              Profissional: experiencias profissionais do curriculo selecionado.
            </Text>
            <Text className="text-muted-foreground">
              Projetos: projetos do curriculo selecionado.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScreenContainer>
  );
}