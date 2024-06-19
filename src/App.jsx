import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordions from "./Accordion.jsx";
import BasicTabs from "./Tabs.jsx";
import TextArea from "./TxtArea.jsx";

import "./App.css";

function App() {
  const formInp = [
    { id: "codigoPostal", label: "Codigo Postal", defaultValue: "" },
    { id: "departamento", label: "Departamento", defaultValue: "" },
    { id: "provincia", label: "Provincia", defaultValue: "" },
    { id: "ciudad", label: "Ciudad", defaultValue: "" },
    { id: "barrio", label: "Barrio", defaultValue: "" },
    { id: "calle", label: "Calle", defaultValue: "" },
    { id: "casaPredio", label: "Casa/Predio", defaultValue: "" },
    { id: "entreCalles", label: "Entre calles", defaultValue: "" },
    { id: "numeroApartamento", label: "N° apartamento", defaultValue: "." },
    { id: "urbanizacion", label: "Urbanizacion", defaultValue: "Urbanizado" },
    { id: "llamada", label: "Llamada", defaultValue: "Llamar antes" },
    { id: "coordenadas", label: "Coordenadas", defaultValue: "" },
  ];

  const initialFormValues = {};
  formInp.forEach((inp) => {
    initialFormValues[inp.id] = inp.defaultValue || "";
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [selectedText, setSelectedText] = useState("");

  const [capitalizationApplied, setCapitalizationApplied] = useState(false);

  const connectors = ["de", "y", "en", "la", "el", "del", "con"];

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word, index) => {
        if (index !== 0 && connectors.includes(word.toLowerCase())) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const handleChange = (event, id) => {
    const newValue = event.target.value;

    if (
      !capitalizationApplied &&
      (id === "codigoPostal" ||
        id === "departamento" ||
        id === "provincia" ||
        id === "ciudad" ||
        id === "barrio")
    ) {
      const valuesArray = newValue.split("\t").slice(0, 5);

      const capitalizedValues = valuesArray.map((value) =>
        capitalizeWords(value)
      );

      const updatedFormValues = { ...formValues };

      capitalizedValues.forEach((value, index) => {
        updatedFormValues[formInp[index].id] = value;
      });

      setFormValues(updatedFormValues);
      setCapitalizationApplied(true);
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
    }
  };

  const handleItemClick = (text) => {
    setSelectedText(text);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
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
            value={formValues[inp.id]}
            onChange={(event) => handleChange(event, inp.id)}
          />
        ))}
      </Box>

      <h2 className="text-2xl font-semibold">Llenar comentario</h2>

      <BasicTabs selectedText={selectedText} onChangeText={setSelectedText} />

      <Accordions selectedText={selectedText} onChangeText={setSelectedText} />

      {/* Aquí se muestra el TextArea, que está dentro de los Tabs */}
      {/* No es necesario moverlo aquí, sigue en su ubicación original dentro de los Tabs */}
    </div>
  );
}

export default App;
