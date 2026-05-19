import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";

import type { Tecnologia } from "@/features/tecnologias/types/tecnologia.type";

type TecnologiaBadgeProps = {
  tecnologia: Tecnologia;
};

function getCategoriaLabel(categoria: Tecnologia["categoria"]) {
  switch (categoria) {
    case "BANCO_DE_DADOS":
      return "Banco de dados";
    default:
      return categoria.charAt(0) + categoria.slice(1).toLowerCase();
  }
}

export function TecnologiaBadge({ tecnologia }: TecnologiaBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1 px-3 py-2">
      <Text className="font-medium">{tecnologia.nome}</Text>
      <Text className="text-muted-foreground text-xs">
        {getCategoriaLabel(tecnologia.categoria)}
      </Text>
    </Badge>
  );
}