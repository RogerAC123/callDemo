import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import DatePick from "./DatePicker";
import TextArea from "./TxtArea";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const TakeGo = [
  { id: "referenciaCercana", label: "Referencia cercana" },
  { id: "descCasaTG", label: "Desc. casa" },
  { id: "telefonoTG", label: "Telefono" },
  { id: "linkMapaTG", label: "Link mapa" },
  { id: "productoTG", label: "Producto" },
  { id: "precioTG", label: "Precio", adornment: "bob" },
];

const MisEnviosEide = [
  { id: "entreCalles", label: "Entre calles" },
  { id: "coordernadas", label: "Coordernadas" },
  { id: "descCasaME", label: "Desc. casa" },
  { id: "linkMapaME", label: "Link mapa" },
  { id: "productoME", label: "Producto" },
  { id: "precioME", label: "Precio", adornment: "bob" },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [formValuesTakeGo, setFormValuesTakeGo] = useState({});
  const [formValuesMisEnviosEide, setFormValuesMisEnviosEide] = useState({});
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event, id, isTakeGo) => {
    const newValue = event.target.value;
    if (isTakeGo) {
      const updatedFormValues = {
        ...formValuesTakeGo,
        [id]: newValue,
      };
      setFormValuesTakeGo(updatedFormValues);
      updateTextAreaValue(updatedFormValues, formValuesMisEnviosEide, isTakeGo);
    } else {
      const updatedFormValues = {
        ...formValuesMisEnviosEide,
        [id]: newValue,
      };
      setFormValuesMisEnviosEide(updatedFormValues);
      updateTextAreaValue(formValuesTakeGo, updatedFormValues, isTakeGo);
    }
  };

  const handleDateChange = (date, isTakeGo) => {
    if (isTakeGo) {
      const updatedFormValues = {
        ...formValuesTakeGo,
        fechaTG: date,
      };
      setFormValuesTakeGo(updatedFormValues);
      updateTextAreaValue(updatedFormValues, formValuesMisEnviosEide, isTakeGo);
    } else {
      const updatedFormValues = {
        ...formValuesMisEnviosEide,
        fechaME: date,
      };
      setFormValuesMisEnviosEide(updatedFormValues);
      updateTextAreaValue(formValuesTakeGo, updatedFormValues, isTakeGo);
    }
  };

  const updateTextAreaValue = (takeGoValues, misEnviosEideValues, isTakeGo) => {
    let text = "";

    if (!isTakeGo) {
      // Manejo de cada campo individualmente de MisEnviosEide
      MisEnviosEide.forEach((field, index) => {
        const fieldValue = misEnviosEideValues[field.id] || "";

        // Formateo específico para "coordernadas"
        if (field.id === "coordernadas") {
          text += `(${fieldValue}) `;
        }
        // Formateo por defecto para los otros campos
        else {
          text += `${fieldValue}${
            index !== MisEnviosEide.length - 1 ? " / " : ""
          }`;
        }
      });

      // Agregar la fecha formateada para "fechaME"
      const fechaME = misEnviosEideValues.fechaME;
      if (fechaME) {
        const formattedDate = formatDate(fechaME);
        text += `/ ${formattedDate}`;
      }
    } else {
      // Manejo de cada campo individualmente de TakeGo
      TakeGo.forEach((field, index) => {
        const fieldValue = takeGoValues[field.id] || "";

        // Formateo específico para "precioTG"
        if (field.id === "precioTG") {
          text += `${fieldValue} bob `;
        }
        // Formateo por defecto para los otros campos
        else {
          text += `${fieldValue}${index !== TakeGo.length - 1 ? " / " : ""}`;
        }
      });

      // Agregar la fecha formateada para "fechaTG"
      const fechaTG = takeGoValues.fechaTG;
      if (fechaTG) {
        const formattedDate = formatDate(fechaTG);
        text += `/ ${formattedDate}`;
      }
    }

    setTextAreaValue(text.trim());
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const handleLimpiarCampos = () => {
    if (value === 0) {
      setFormValuesMisEnviosEide({});
      updateTextAreaValue({}, formValuesTakeGo);
    } else if (value === 1) {
      setFormValuesTakeGo({});
      updateTextAreaValue(formValuesMisEnviosEide, {});
    }

    setTextAreaValue("");
  };
  return (
    <Box sx={{ width: "92%" }}>
      <Box
        sx={{
          borderBottom: 1,
          position: "relative",
          marginBottom: 2,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Mis envios e Ide courier" {...a11yProps(0)} />
          <Tab label="Take & Go" {...a11yProps(1)} />
        </Tabs>
        <button
          className="absolute right-0 top-2 p-1 size-8 hover:scale-110 hover:backdrop-brightness-95 rounded-md"
          id="limpiarCampos"
          onClick={handleLimpiarCampos}
        >
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m6 2 2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
              fill="#e30000"
            />
          </svg>
        </button>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          className="flex flex-wrap justify-center bg-white"
          component="form"
          sx={{
            "& > :not(style)": { m: 0.7, width: "16ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {MisEnviosEide.map((inp, i) => (
            <TextField
              key={i}
              label={inp.label}
              variant="outlined"
              value={formValuesMisEnviosEide[inp.id] || ""}
              onChange={(event) => handleInputChange(event, inp.id, false)}
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
          <DatePick
            selectedDate={formValuesMisEnviosEide.fechaME || null}
            onDateChange={(date) => handleDateChange(date, false)}
          />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          className="flex flex-wrap justify-center bg-white"
          component="form"
          sx={{
            "& > :not(style)": { m: 0.7, width: "16ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {TakeGo.map((inp, i) => (
            <TextField
              key={i}
              label={inp.label}
              variant="outlined"
              value={formValuesTakeGo[inp.id] || ""}
              onChange={(event) => handleInputChange(event, inp.id, true)}
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
          <DatePick
            selectedDate={formValuesTakeGo.fechaTG || null}
            onDateChange={(date) => handleDateChange(date, true)}
          />
        </Box>
      </CustomTabPanel>
      <Box className="mt-4">
        <TextArea text={textAreaValue} onChangeText={setTextAreaValue} />
      </Box>
    </Box>
  );
}
