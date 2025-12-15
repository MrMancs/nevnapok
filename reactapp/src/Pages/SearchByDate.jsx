import { useState } from "react";
import MyDatePicker from "../Components/MyDatePicker";
import MyToast from "../Components/MyToast";
import NameDayTable from "../Components/NameDayTable";

export default function SearchByDate(props) {
  const [nameDays, setNameDays] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [taostText, setToastText] = useState([]);

  const handleDateSelect = (date) => {
    props?.isLoading(true);
    fetch(`http://localhost:3333/api/nevnapok/?nap=${date}`)
      .then(async (res) => {
        const data = await res.json();
        if (data?.hiba) {
          setToastText([
            {
              header: "Nincs találat",
              body: `Nincs névnap ezen a napon ${date}!`,
            },
          ]);
          setShowToast(true);
        } else {
          setNameDays(data);
        }
      })
      .catch(console.warn)
      .finally(() => props?.isLoading(false));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {showToast && (
        <MyToast
          show={showToast}
          showToast={setShowToast}
          taostText={taostText}
        />
      )}
      <MyDatePicker search={handleDateSelect} />
      {nameDays.length > 0 && (
        <div>
          <NameDayTable nameDays={nameDays} month="" />
        </div>
      )}
    </div>
  );
}
