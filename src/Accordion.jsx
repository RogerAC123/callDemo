import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import PropTypes from "prop-types";

function Accordions({ textAreaValue }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const currentDate = dayjs();
  const formattedDate = currentDate.format("DD-MM-YYYY");

  const AccordionInf = {
    NoAnswer: [
      `2 marcaciones no contesta ${formattedDate}`,
      `2 marcaciones buzon de voz ${formattedDate}`,
      `2 marcaciones sin tono ${formattedDate}`,
      `2 marcaciones numero sin servicio ${formattedDate}`,
      `contesta y cuelga sin informacion ${formattedDate}`,
    ],
    RECALL: [
      `cliente indica llamar el ${formattedDate} a las 15hrs`,
      `cliente indica estar ocupado llamar el ${formattedDate} a las 15hrs`,
      `cliente indica estar conduciendo llamar el ${formattedDate} a las 15hrs`,
      `cliente indica estar en su trabajo llamar el ${formattedDate} a las 15hrs`,
    ],
    REJECT: [
      "cliente indica estar de viaje volver a ingresar en la pagina web",
      "cliente indica que el producto es demasiado caro",
      "cliente indica comprar cuando cobre su salario",
      "cliente indica recibir malos comentarios",
      "el cliente es menor de edad",
      "el cliente ingresara nuevamente a la pagina web",
      "el cliente cuelga con informacion y no responde",
      "cliente no ha solicitado el producto",
      "cliente solo solicita informacion",
      "cliente indica no tener dinero en este momento",
      "cliente indica haber visto otro precio en la publicidad",
      `contesta y cuelga con informacion ${formattedDate}`,
    ],
    TRASH: [
      "cliente indica haber ya solictado el producto",
      "cliente indica que el numero esta equivocado",
      "orden de broma",
    ],
  };

  return (
    <div className="w-[100%] select-none mb-5">
      <Accordion
        expanded={expanded === "panelNoAnswer"}
        onChange={handleChange("panelNoAnswer")}
        sx={{ border: "1px solid #bdecb6" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelNoAnswerbh-content"
          id="panelNoAnswerbh-header"
          sx={{ backgroundColor: "#bdecb650" }}
        >
          <Typography>NO ANSWER</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full flex flex-col">
            {AccordionInf.NoAnswer.map((item, i) => (
              <Typography
                className="hover:bg-slate-200 px-2 py-1 rounded-md"
                key={`NoAnswer_${i}`}
              >
                {item}
              </Typography>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panelRECALL"}
        onChange={handleChange("panelRECALL")}
        sx={{ border: "1px solid #9c9c9c" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelRECALLbh-content"
          id="panelRECALLbh-header"
          sx={{ background: "#9c9c9c50" }}
        >
          <Typography>RECALL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full flex flex-col">
            {AccordionInf.RECALL.map((item, i) => (
              <Typography
                className="hover:bg-slate-200 px-2 py-1 rounded-md"
                key={`RECALL_${i}`}
              >
                {item}
              </Typography>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panelREJECT"}
        onChange={handleChange("panelREJECT")}
        sx={{ border: "1px solid #ff6961" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panelREJECTbh-content"
          id="panelREJECTbh-header"
          sx={{ background: "#ff696150" }}
        >
          <Typography>REJECT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full flex flex-col">
            {AccordionInf.REJECT.map((item, i) => (
              <Typography
                className="hover:bg-slate-200 px-2 py-1 rounded-md"
                key={`REJECT_${i}`}
              >
                {item}
              </Typography>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panelTRASH"}
        onChange={handleChange("panelTRASH")}
        sx={{ border: "1px solid #1c0d02" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panelTRASHbh-content"
          id="panelTRASHbh-header"
          sx={{ background: "#1c0d02", color: "white" }}
        >
          <Typography>TRASH</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full">
            {AccordionInf.TRASH.map((item, i) => (
              <Typography
                className="hover:bg-slate-200 px-2 py-1 rounded-md"
                key={`TRASH_${i}`}
              >
                {item}
              </Typography>
            ))}
            <div>
              <Typography className="hover:bg-slate-200 px-2 py-1 rounded-md">
                colombia: <span>sin cobertura departamento, ciudad</span>
              </Typography>
              <Typography className="hover:bg-slate-200 px-2 py-1 rounded-md">
                mexico: <span>sin cobertura estado, colonia, cod postal</span>
              </Typography>
              <Typography className="hover:bg-slate-200 px-2 py-1 rounded-md">
                bolivia: <span>sin cobertura departamento, ciudad</span>
              </Typography>
              <Typography className="hover:bg-slate-200 px-2 py-1 rounded-md">
                costa rica: <span>sin cobertura provincia, ciudad</span>
              </Typography>
              <Typography className="hover:bg-slate-200 px-2 py-1 rounded-md">
                venezuela: <span>sin cobertura estado, ciudad</span>
              </Typography>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

Accordions.propTypes = {
  textAreaValue: PropTypes.string.isRequired,
};

export default Accordions;
