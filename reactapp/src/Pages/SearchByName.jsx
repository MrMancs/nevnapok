import { useState, useEffect } from "react";
import NameInput from "../Components/NameInput";
import MyToast from "../Components/MyToast";
import NameDayTable from "../Components/NameDayTable";

export default function SearchByName(props) {
  const [showToast, setShowToast] = useState(false);
  const [taostText, setToastText] = useState([]);
  const [searcedData, setSearchedData] = useState([]);
  const [searcedName, setSearchedName] = useState("");

  const handleSearch = (name) => {
    props?.isLoading(true);
    fetch(`http://localhost:3333/api/nevnapok/?nev=${name}`)
      .then(async (res) => {
        const data = await res.json();
        if (data.hiba) {
          setToastText([
            {
              header: "Nincs találat",
              body: `Nincs találat a követkkező névre: ${name}!`,
            },
          ]);
          setShowToast(true);
        } else {
          setSearchedName(name);
          setSearchedData(data);
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

      <NameInput
        warning={setToastText}
        showToast={setShowToast}
        onSearch={handleSearch}
      />

      {searcedData.length > 0 && (
        <div className="searchByNameDiv">
          {searcedData.length === 1 ? (
            searcedData.map(({ datum, nevnap1, nevnap2 }, idx) =>
              nevnap1 === searcedName ? (
                <p key={idx}>
                  <strong>{searcedName}</strong> névnapja: {datum}
                </p>
              ) : (
                <p key={idx}>
                  <strong>{searcedName}</strong> névnapja: {datum}
                </p>
              )
            )
          ) : (
            <>
              <h3 style={{ fontSize: "20px" }}>
                <strong>{searcedName}</strong> névnapjai:{" "}
              </h3>
              <div className="searchByNameDivList">
                <ul>
                  {searcedData.map(({ datum, nevnap1, nevnap2 }, idx) => (
                    <li key={idx}>{datum}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
