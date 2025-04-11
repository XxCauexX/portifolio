// components/ParticlesSection.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  Container,
  ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type ParticlesSectionProps = {
  /** Classe CSS opcional para o container */
  className?: string;
  /** Estilos inline para o container (por exemplo, definindo largura/altura) */
  style?: React.CSSProperties;
  /** ID para o componente Particles (padrão: "tsparticles") */
  id?: string;
};

const ParticlesSection: React.FC<ParticlesSectionProps> = ({
  className,
  style,
  id = "tsparticles",
}) => {
  // Estado para indicar se o engine foi inicializado
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Inicializa o engine de partículas apenas uma vez
    initParticlesEngine(async (engine) => {
      // Carrega o bundle "slim" do tsParticles
      await loadSlim(engine);
    }).then(() => {
      setInitialized(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded:", container);
  };

  // Define as opções para as partículas (pode customizar conforme sua necessidade)
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          // Defina a cor de fundo desejada para a área de partículas
          value: "",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#3b0764" },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  // Enquanto não estiver inicializado, não renderiza nada
  if (!initialized) return null;

  return (
    // O container pode receber classes e estilos para limitar a área da animação
    <div className={className} style={style}>
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
};

export default ParticlesSection;
