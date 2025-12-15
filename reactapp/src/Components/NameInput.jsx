import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

export default function NameInput(props) {
  const [firstName, setFirstName] = useState("");

  const handleOnChange = (e) => {
    const name = e.target.value;
    setFirstName(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName.includes(" ")) {
      props?.warning([
        {
          header: "Helytelen keresztnév",
          body: "A keresztnév nem tartalmazhat szóközt!",
        },
      ]);
      props?.showToast(true);
    } else {
      if (!firstName) {
        props?.warning([
          { header: "Helytelen keresztnév", body: "Kérem töltse ki a mezőt!" },
        ]);
        props?.showToast(true);
      } else {
        const firstLetterToUpperCase = firstName.charAt(0).toUpperCase();
        const remainingLetters = firstName.slice(1);
        const capitalizedName = firstLetterToUpperCase + remainingLetters;
        setFirstName("");
        props?.onSearch(capitalizedName);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)} className="nameForm">
        <Form.Control
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          placeholder="Keresztnév"
          onChange={(e) => handleOnChange(e)}
        />

        <Button onClick={(e) => handleSubmit(e)} variant="secondary">
          <IoSearch /> Keresés
        </Button>
      </Form>
    </div>
  );
}
