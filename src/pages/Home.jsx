import { Box, Typography } from "@mui/material";
import Bolivia from "../assets/bolivia.webp";
import "../App.css";

function Home() {
  const abrirVentanaEmergente = (url) => {
    const ancho = 800;
    const alto = 800;
    const left = window.innerWidth / 2 - ancho / 2;
    const top = window.innerHeight / 2 - alto / 2;
    const opciones = `width=${ancho},height=${alto},left=${left},top=${top}`;

    const fullPath = `${window.location.origin}${url}`;
    window.open(fullPath, "_blank", opciones);
  };

  const handleAbrirVentana = (event) => {
    event.preventDefault();
    abrirVentanaEmergente("/bolivia");
  };

  return (
    <>
      <Box className=" flex flex-col w-full items-center gap-7">
        <Typography variant="h3">Campañas</Typography>
        <a
          href={`${window.location.origin}/bolivia`}
          className="relative group"
          onClick={handleAbrirVentana}
        >
          <img
            className="mask-flag pointer-events-none aspect-[3/2] h-auto w-28 object-contain object-center"
            src={Bolivia}
            alt="Bolivia"
          />
          <p className="absolute -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 font-bold uppercase transition-all duration-300">
            bolivia
          </p>
        </a>
      </Box>
    </>
  );
}

export default Home;
