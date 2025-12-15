import { useEffect, useState } from "react";

function getCurrentNameDay(setCurrentNameDay, setIsLoading) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const date = `${currentMonth}-${currentDay}`;

  setIsLoading(true);

  fetch(`http://localhost:3333/api/nevnapok/?nap=${date}`)
    .then(async (res) => {
      const data = await res.json();
      setCurrentNameDay(data);
    })
    .catch(console.warn)
    .finally(() => setIsLoading(false));
}

export default function CurrentNameDay(props) {
  const [currentNameDay, setCurrentNameDay] = useState([]);

  useEffect(() => {
    getCurrentNameDay(setCurrentNameDay, props?.isLoading);
  }, []);

  return (
    <div>
      {currentNameDay.length > 0 &&
        currentNameDay.map(({ datum, nevnap1, nevnap2 }, idx) =>
          nevnap2 ? (
            <div key={idx} className="currentNameDay">
              <h2>
                Ma{" "}
                <strong>
                  {nevnap1} és {nevnap2}
                </strong>{" "}
                névnapja van.
              </h2>
            </div>
          ) : (
            <div key={idx} className="currentNameDay">
              <h2>
                Ma <strong>{nevnap1}</strong> névnapja van.
              </h2>
            </div>
          )
        )}
    </div>
  );
}
