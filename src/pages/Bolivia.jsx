import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordions from "../components/Accordion.jsx";
import BasicTabs from "../components/Tabs.jsx";
import TextArea from "../components/TextArea.jsx";
import Typography from "@mui/material/Typography";

function Bolivia() {
  const formInp = [
    { id: "codigoPostal", label: "Codigo Postal" },
    { id: "departamento", label: "Departamento" },
    { id: "provincia", label: "Provincia" },
    { id: "ciudad", label: "Ciudad" },
    { id: "barrio", label: "Barrio" },
    { id: "calle", label: "Calle" },
    { id: "casaPredio", label: "Casa/Predio" },
    { id: "entreCalles", label: "Entre calles" },
    { id: "numeroApartamento", label: "N° apartamento", defaultValue: "." },
    { id: "urbanizacion", label: "Urbanizacion", defaultValue: "Urbanizado" },
    { id: "llamada", label: "Llamada", defaultValue: "Llamar antes" },
    { id: "coordenadas", label: "Coordenadas" },
  ];

  const initialFormValues = {};
  formInp.forEach((inp) => {
    initialFormValues[inp.id] = inp.defaultValue || "";
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [textAreaValue, setTextAreaValue] = useState("");

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

    if (id === "codigoPostal") {
      const valuesArray = newValue.split("\t").slice(0, 5);
      const capitalizedValues = valuesArray.map((value) =>
        capitalizeWords(value)
      );
      const updatedFormValues = { ...formValues };

      capitalizedValues.forEach((value, index) => {
        updatedFormValues[formInp[index].id] = value;
      });

      setFormValues(updatedFormValues);
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
    }
  };

  const handleTabInputChange = (updatedTextAreaValue) => {
    setTextAreaValue(updatedTextAreaValue);
  };

  const handleTextUpdate = (text) => {
    setTextAreaValue(text);
  };

  const handleLimpiarCampos = () => {
    const clearedFormValues = {};
    formInp.forEach((inp) => {
      clearedFormValues[inp.id] =
        inp.defaultValue !== undefined ? inp.defaultValue : "";
    });

    setFormValues(clearedFormValues);
    setTextAreaValue("");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-5 mt-5">
      <Typography variant="h5" className="text-2xl font-semibold">
        Dirección
      </Typography>
      <Box
        className="flex flex-wrap justify-center"
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
      <Box className="flex flex-col w-full items-center">
        <Box className="flex flex-col w-[90%] items-center">
          <Typography variant="h5" className="text-2xl font-semibold">
            Comentario
          </Typography>
        </Box>
        <BasicTabs
          onTabInputChange={handleTabInputChange}
          onLimpiarCampos={handleLimpiarCampos}
        />
        <Box className="w-full mt-2">
          <TextArea text={textAreaValue} onChangeText={setTextAreaValue} />
        </Box>
      </Box>
      <Accordions onTextUpdate={handleTextUpdate} />
    </div>
  );
}

export default Bolivia;
