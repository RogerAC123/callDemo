import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import DatePick from "./DatePicker";
import TextArea from "./TextArea";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const productos = [
  { label: "1 Poweronix", value: 290 },
  { label: "3 Poweronix", value: 500 },
  { label: "5 Poweronix", value: 750 },
  { label: "7 Poweronix", value: 1000 },
  { label: "9 Poweronix", value: 1250 },

  { label: "1 Lutevid", value: 290 },
  { label: "3 Lutevid", value: 500 },
  { label: "5 Lutevid", value: 750 },
  { label: "7 Lutevid", value: 1000 },
  { label: "9 Lutevid", value: 1250 },

  { label: "1 Oxys", value: 320 },
  { label: "3 Oxys", value: 560 },
  { label: "5 Oxys", value: 840 },
  { label: "7 Oxys", value: 1120 },
  { label: "9 Oxys", value: 1400 },
];

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

  const handleInputChange = (event, id, isTakeGo, isProduct) => {
    const newValue = event.target.value;
    let updatedFormValues;
    if (isTakeGo) {
      updatedFormValues = {
        ...formValuesTakeGo,
        [id]: newValue,
      };
      if (isProduct) {
        const product = productos.find((p) => p.label === newValue);
        if (product) {
          updatedFormValues.precioTG = product.value;
        }
      }
      setFormValuesTakeGo(updatedFormValues);
      updateTextAreaValue(updatedFormValues, formValuesMisEnviosEide, isTakeGo);
    } else {
      updatedFormValues = {
        ...formValuesMisEnviosEide,
        [id]: newValue,
      };
      if (isProduct) {
        const product = productos.find((p) => p.label === newValue);
        if (product) {
          updatedFormValues.precioME = product.value;
        }
      }
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
      MisEnviosEide.forEach((field, index) => {
        const fieldValue = misEnviosEideValues[field.id] || "";

        if (field.id === "coordernadas") {
          text += `(${fieldValue}) `;
        } else if (field.id === "entreCalles") {
          text += ` ${fieldValue} `;
        } else if (field.id === "precioME") {
          text += `${fieldValue} bob /`;
        } else {
          text += `${fieldValue}${
            index !== MisEnviosEide.length - 1 ? " / " : ""
          }`;
        }
      });

      const fechaME = misEnviosEideValues.fechaME;
      if (fechaME) {
        const formattedDate = formatDate(fechaME);
        text += ` ${formattedDate}`;
      }
    } else {
      TakeGo.forEach((field, index) => {
        const fieldValue = takeGoValues[field.id] || "";
        if (!fieldValue) return;

        if (field.id === "precioTG") {
          text += `${fieldValue} bob /`;
        } else if (field.id === "referenciaCercana") {
          text += `${fieldValue} `;
        } else if (field.id === "descCasaTG") {
          text += `${fieldValue} `;
        } else if (field.id === "linkMapaTG") {
          text += `/ ${fieldValue} / `;
        } else if (field.id === "telefonoTG") {
          text += `/ ${fieldValue} `;
        } else {
          text += `${fieldValue}${index !== TakeGo.length - 1 ? " / " : ""}`;
        }
      });

      const fechaTG = takeGoValues.fechaTG;
      if (fechaTG) {
        const formattedDate = formatDate(fechaTG);
        text += ` ${formattedDate}`;
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
    if (onLimpiarCampos) {
      onLimpiarCampos();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          className="absolute right-2 top-2 p-1 size-8 hover:scale-110 hover:backdrop-brightness-95 active:scale-90 rounded-md"
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
          className="flex flex-wrap justify-center"
          component="form"
          sx={{
            "& > :not(style)": { m: 0.7, width: "17ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {MisEnviosEide.map((inp, i) =>
            inp.id === "productoME" ? (
              <Autocomplete
                key={i}
                options={productos.map((p) => p.label)}
                value={formValuesMisEnviosEide[inp.id] || ""}
                onChange={(event, newValue) =>
                  handleInputChange(
                    { target: { value: newValue } },
                    inp.id,
                    false,
                    true
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label={inp.label} variant="outlined" />
                )}
              />
            ) : (
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
            )
          )}
          <DatePick
            selectedDate={formValuesMisEnviosEide.fechaME || null}
            onDateChange={(date) => handleDateChange(date, false)}
          />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          className="flex flex-wrap justify-center"
          component="form"
          sx={{
            "& > :not(style)": { m: 0.7, width: "17ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {TakeGo.map((inp, i) =>
            inp.id === "productoTG" ? (
              <Autocomplete
                key={i}
                options={productos.map((p) => p.label)}
                value={formValuesTakeGo[inp.id] || ""}
                onChange={(event, newValue) =>
                  handleInputChange(
                    { target: { value: newValue } },
                    inp.id,
                    true,
                    true
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} label={inp.label} variant="outlined" />
                )}
              />
            ) : (
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
            )
          )}
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

BasicTabs.propTypes = {
  onLimpiarCampos: PropTypes.func.isRequired,
};
