import { Redirect } from "expo-router";

import { routes } from "@/lib/constants/routes";

export default function CurriculosIndexPage() {
  return <Redirect href={routes.home} />;
}