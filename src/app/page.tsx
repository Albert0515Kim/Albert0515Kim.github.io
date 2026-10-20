import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Toolbox } from "@/components/sections/Toolbox";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <Toolbox />
      <Contact />
    </>
  );
}
