import * as React from "react";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import PropTypes from "prop-types";

export default function TextArea({ text, onChangeText }) {
  const handleTextChange = (event) => {
    if (onChangeText) {
      onChangeText(event.target.value);
    }
  };

  return (
    <Textarea
      sx={{ margin: 1 }}
      placeholder="Comentario"
      value={text || ""}
      onChange={handleTextChange}
      minRows={2}
      maxRows={4}
      endDecorator={
        <Typography level="body-xs" sx={{ ml: "auto" }}>
          {(text || "").length}{" "}
          {(text || "").length === 1 ? "carácter" : "caracteres"}
        </Typography>
      }
    />
  );
}

TextArea.propTypes = {
  text: PropTypes.string,
  onChangeText: PropTypes.func,
};
