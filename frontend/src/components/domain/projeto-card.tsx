import { Linking, View } from "react-native";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import type { Projeto } from "@/features/projetos/types/projeto.type";

type ProjetoCardProps = {
    projeto: Projeto;
    onPress?: () => void;
};

function getTipoLabel(tipo: Projeto["tipo"]) {
    switch (tipo) {
        case "ACADEMICO":
            return "Academico";
        case "PROFISSIONAL":
            return "Profissional";
        case "INDIVIDUAL":
            return "Individual";
        default:
            return tipo;
    }
}

export function ProjetoCard({ projeto, onPress }: ProjetoCardProps) {
    const tecnologias = projeto.tecnologias ?? [];

    async function handleOpenUrl(url: string) {
        await Linking.openURL(url);
    }

    return (
        <Card>
            <CardHeader className="gap-2">
                <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1 gap-1">
                        <CardTitle>{projeto.titulo}</CardTitle>
                        <CardDescription>{projeto.descricaoCurta}</CardDescription>
                    </View>

                    <Badge variant="secondary">
                        <Text>{getTipoLabel(projeto.tipo)}</Text>
                    </Badge>
                </View>
            </CardHeader>

            <CardContent className="gap-3">
                <Text className="text-muted-foreground text-sm">
                    {projeto.descricaoLonga}
                </Text>

                {projeto.instituicao ? (
                    <Text className="text-muted-foreground text-sm">
                        Instituicao: {projeto.instituicao}
                    </Text>
                ) : null}

                {tecnologias.length ? (
                    <View className="flex-row flex-wrap gap-2">
                        {tecnologias.map((tecnologia) => (
                            <Badge key={tecnologia.id} variant="outline">
                                <Text>{tecnologia.nome}</Text>
                            </Badge>
                        ))}
                    </View>
                ) : null}
            </CardContent>

            <CardFooter className="gap-2">
                {onPress ? (
                    <Button className="flex-1" onPress={onPress}>
                        <Text>Abrir</Text>
                    </Button>
                ) : null}

                {projeto.githubUrl ? (
                    <Button
                        className="flex-1"
                        variant="outline"
                        onPress={() => {
                            if (projeto.githubUrl) {
                                handleOpenUrl(projeto.githubUrl);
                            }
                        }}
                    >
                        <Text>GitHub</Text>
                    </Button>
                ) : null}

                {projeto.demoUrl ? (
                    <Button
                        className="flex-1"
                        variant="outline"
                        onPress={() => {
                            if (projeto.demoUrl) {
                                handleOpenUrl(projeto.demoUrl);
                            }
                        }}
                    >
                        <Text>Demo</Text>
                    </Button>
                ) : null}
            </CardFooter>
        </Card>
    );
}