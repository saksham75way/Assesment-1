import { ThemeProvider, createTheme } from "@mui/material/styles";
import Hero from "../components/hompage.components/Hero";
import Features from "../components/hompage.components/Features";

export default function Home() {
  return (
    <ThemeProvider theme={createTheme}>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
    </ThemeProvider>
  );
}
