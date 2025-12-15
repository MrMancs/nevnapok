import { useState } from "react";
import { Form } from "react-bootstrap";

export default function RadioButtons(props) {
  const handleRadioButtons = (e) => {
    const selectedOption = e.target.id;
    props?.radioOption(selectedOption);
  };

  return (
    <Form style={{ marginTop: "20px" }}>
      <Form.Check
        inline
        name="nameDay"
        type="radio"
        id="nameSearch"
        label="Keresés név alapján"
        onChange={(e) => handleRadioButtons(e)}
      />

      <Form.Check
        inline
        name="nameDay"
        type="radio"
        id="dateSearch"
        label="Keresés dátum alapján"
        onChange={(e) => handleRadioButtons(e)}
      />
    </Form>
  );
}
