import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import DatePick from "./DatePicker";

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
  const [value, setValue] = React.useState(0);
  const [formValuesTakeGo, setFormValuesTakeGo] = React.useState({});
  const [formValuesMisEnviosEide, setFormValuesMisEnviosEide] = React.useState(
    {}
  );

  const handleChangeTakeGo = (event, id) => {
    const newValue = event.target.value;
    setFormValuesTakeGo((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleDateChangeTakeGo = (date) => {
    setFormValuesTakeGo((prevState) => ({
      ...prevState,
      fechaTG: date,
    }));
  };

  const handleChangeMisEnviosEide = (event, id) => {
    const newValue = event.target.value;
    setFormValuesMisEnviosEide((prevState) => ({
      ...prevState,
      [id]: newValue,
    }));
  };

  const handleDateChangeMisEnviosEide = (date) => {
    setFormValuesMisEnviosEide((prevState) => ({
      ...prevState,
      fechaME: date,
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log("TakeGo values:", formValuesTakeGo);
    console.log("MisEnviosEide values:", formValuesMisEnviosEide);
  }, [formValuesTakeGo, formValuesMisEnviosEide]);

  return (
    <Box sx={{ width: "92%" }}>
      <Box sx={{ borderBottom: 1, marginBottom: 2, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Mis envios e Ide courier" {...a11yProps(0)} />
          <Tab label="Take & Go" {...a11yProps(1)} />
        </Tabs>
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
              onChange={(event) => handleChangeMisEnviosEide(event, inp.id)}
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
            onDateChange={handleDateChangeMisEnviosEide}
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
              onChange={(event) => handleChangeTakeGo(event, inp.id)}
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
            onDateChange={handleDateChangeTakeGo}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
