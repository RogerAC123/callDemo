import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import DatePick from "./DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

import "dayjs/locale/es";

dayjs.locale("es");

const prices = { poweronix: 250, lutevid: 250, oxys: 280 };
const pricesPost = { poweronix: 230, lutevid: 230, oxys: 230 };

const productos = [
  { label: "1 Poweronix", value: prices.poweronix + 40 },
  { label: "3 Poweronix", value: prices.poweronix * 2 },
  { label: "5 Poweronix", value: prices.poweronix * 3 },
  { label: "7 Poweronix", value: prices.poweronix * 4 },
  { label: "9 Poweronix", value: prices.poweronix * 5 },

  { label: "1 Lutevid", value: prices.lutevid + 40 },
  { label: "3 Lutevid", value: prices.lutevid * 2 },
  { label: "5 Lutevid", value: prices.lutevid * 3 },
  { label: "7 Lutevid", value: prices.lutevid * 4 },
  { label: "9 Lutevid", value: prices.lutevid * 5 },

  { label: "1 Oxys", value: prices.oxys + 40 },
  { label: "3 Oxys", value: prices.oxys * 2 },
  { label: "5 Oxys", value: prices.oxys * 3 },
  { label: "7 Oxys", value: prices.oxys * 4 },
  { label: "9 Oxys", value: prices.oxys * 5 },
];

const productosPost = [
  { label: "1 Poweronix", value: pricesPost.poweronix + 40 },
  { label: "3 Poweronix", value: pricesPost.poweronix * 2 },
  { label: "5 Poweronix", value: pricesPost.poweronix * 3 },
  { label: "7 Poweronix", value: pricesPost.poweronix * 4 },
  { label: "9 Poweronix", value: pricesPost.poweronix * 5 },

  { label: "1 Lutevid", value: pricesPost.lutevid + 40 },
  { label: "3 Lutevid", value: pricesPost.lutevid * 2 },
  { label: "5 Lutevid", value: pricesPost.lutevid * 3 },
  { label: "7 Lutevid", value: pricesPost.lutevid * 4 },
  { label: "9 Lutevid", value: pricesPost.lutevid * 5 },

  { label: "1 Oxys", value: pricesPost.oxys + 40 },
  { label: "3 Oxys", value: pricesPost.oxys * 2 },
  { label: "5 Oxys", value: pricesPost.oxys * 3 },
  { label: "7 Oxys", value: pricesPost.oxys * 4 },
  { label: "9 Oxys", value: pricesPost.oxys * 5 },
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

const BasicTabs = ({ onTabInputChange, onLimpiarCampos }) => {
  const [value, setValue] = useState(0);
  const [formValuesTakeGo, setFormValuesTakeGo] = useState({});
  const [formValuesMisEnviosEide, setFormValuesMisEnviosEide] = useState({});
  const [postSaleActive, setPostSaleActive] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSwitchChange = (event) => {
    setPostSaleActive(event.target.checked);
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
          updatedFormValues.precioTG = postSaleActive
            ? productosPost.find((p) => p.label === newValue).value
            : product.value;
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
          updatedFormValues.precioME = postSaleActive
            ? productosPost.find((p) => p.label === newValue).value
            : product.value;
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
    const prefix = postSaleActive ? "post sale " : "";

    if (!isTakeGo) {
      MisEnviosEide.forEach((field, index) => {
        const fieldValue = misEnviosEideValues[field.id] || "";

        if (field.id === "coordernadas") {
          text += `(${fieldValue}) `;
        } else if (field.id === "entreCalles") {
          text += `${fieldValue} `;
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

    onTabInputChange(prefix + text.trim());
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

    onLimpiarCampos();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="flex mx-auto justify-between w-[90%]">
        <FormControlLabel
          control={
            <Switch checked={postSaleActive} onChange={handleSwitchChange} />
          }
          label="Post Sale"
          className="select-none"
        />
        <IconButton
          id="limpiarCampos"
          onClick={handleLimpiarCampos}
          aria-label="delete"
          color="error"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
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
    </Box>
  );
};

BasicTabs.propTypes = {
  onTabInputChange: PropTypes.func.isRequired,
  onLimpiarCampos: PropTypes.func.isRequired,
};

export default BasicTabs;
