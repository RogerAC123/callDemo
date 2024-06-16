import * as React from "react";
import DatePick from "./DatePicker.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Accordions from "./Accordion.jsx";
import "./App.css";

function App() {
  const formInp = [
    { label: "Codigo Postal" },
    { label: "Departamento" },
    { label: "Provincia" },
    { label: "Ciudad" },
    { label: "Barrio" },
    { label: "Calle" },
    { label: "Casa/Predio" },
    { label: "Entre calles" },
    { label: "N° apartamento", defaultValue: "." },
    { label: "Urbanizacion", defaultValue: "Urbanizado" },
    { label: "Llamada", defaultValue: "Llamar antes" },
    { label: "Coordenadas" },
  ];

  const commentInp = [
    { label: "Referencia" },
    { label: "Desc. casa" },
    { label: "Telefono" },
    { label: "Link mapa" },
    { label: "Producto" },
    { label: "Precio", adornment: "bob" },
  ];

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center mt-5 gap-5">
      <div className="absolute h-full w-full bg-white -z-10">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      <h2 className="text-2xl font-semibold">Llenar direcciones</h2>
      <Box
        className="flex flex-wrap justify-center bg-white"
        component="form"
        sx={{
          "& > :not(style)": { m: 0.7, width: "17ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {formInp.map((inp, i) => (
          <TextField
            key={i}
            label={inp.label}
            variant="outlined"
            defaultValue={inp.defaultValue || ""}
          />
        ))}
      </Box>

      <h2 className="text-2xl font-semibold">Llenar comentario</h2>

      <Box
        className="flex flex-wrap justify-center bg-white"
        component="form"
        sx={{
          "& > :not(style)": { m: 0.7, width: "17ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {commentInp.map((inp, i) => (
          <TextField
            key={i}
            label={inp.label}
            variant="outlined"
            defaultValue={inp.defaultValue || ""}
            InputProps={{
              ...(inp.adornment && {
                endAdornment: (
                  <InputAdornment position="end">
                    {inp.adornment}
                  </InputAdornment>
                ),
              }),
            }}
          />
        ))}
        <DatePick />
      </Box>

      <Accordions />
    </div>
  );
}

export default App;
