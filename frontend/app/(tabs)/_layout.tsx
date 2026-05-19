import { Tabs } from "expo-router";
import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Home,
  Info,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1d4f91",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="academico"
        options={{
          title: "Acadêmico",
          tabBarIcon: ({ color, size }) => (
            <GraduationCap color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profissional"
        options={{
          title: "Profissional",
          tabBarIcon: ({ color, size }) => (
            <BriefcaseBusiness color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="projetos"
        options={{
          title: "Projetos",
          tabBarIcon: ({ color, size }) => (
            <FolderKanban color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color, size }) => <Info color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="curriculos"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}