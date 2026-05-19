export function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateRange(dataInicio: string, dataFim: string | null) {
  const inicio = formatDate(dataInicio);
  const fim = dataFim ? formatDate(dataFim) : "Atual";

  return `${inicio} - ${fim}`;
}