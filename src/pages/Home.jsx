import { Box, Typography } from "@mui/material";
import Bolivia from "../assets/bolivia.webp";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <Box className="flex flex-col w-full items-center gap-7">
      <Typography variant="h3">Campañas</Typography>
      <Link to="/bolivia" className="relative group">
        <img
          className="mask-flag pointer-events-none aspect-[3/2] h-auto w-28 object-contain object-center"
          src={Bolivia}
          alt="Bolivia"
        />
        <p className="absolute -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 font-bold uppercase transition-all duration-300">
          bolivia
        </p>
      </Link>
    </Box>
  );
}

export default Home;
