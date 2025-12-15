import { useState } from "react";

export default function MyDatePicker(props) {
  const [date, setDate] = useState(new Date());

  const handleDateSelect = (e) => {
    const dateString = e.target.value;

    if (dateString) {
      const dateParts = dateString.split("-");

      let month = dateParts[1];
      let day = dateParts[2];

      if (day.charAt(0) === "0") day = dateParts[1].charAt(1);
      if (month.charAt(0) === "0") month = dateParts[1].charAt(1);

      const date = `${month}-${day}`;
      setDate(date);
      props?.search(date);
    }
  };

  return (
    <div className="datePicker">
      <label htmlFor="dateInput" style={{ marginRight: "5px" }}>
        Dátum:
      </label>
      <input
        type="date"
        id="dateInput"
        name="dateInput"
        onChange={(e) => handleDateSelect(e)}
      />
    </div>
  );
}
