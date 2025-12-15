import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function NameDayTable(props) {
  const nameDays = props?.nameDays;

  return (
    <div className="tableDiv">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Dátum</th>
            <th>Névnap</th>
          </tr>
        </thead>
        <tbody>
          {nameDays.map(({ datum, nevnap1, nevnap2 }, idx) =>
            nevnap2 ? (
              <tr key={idx}>
                <td>{datum}</td>
                <td>
                  {nevnap1}, {nevnap2}
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td>{datum}</td>
                <td>{nevnap1}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}
