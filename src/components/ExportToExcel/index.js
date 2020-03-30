import React, { useContext } from "react";
import ReactExport from "react-export-excel";
import CardContext from "../../context";
import { Button } from "./styles";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExcelToExport() {
  const { data, labels, cardTitle } = useContext(CardContext);
  const multiDataSet = [
    {
      columns: labels,
      data: data
    }
  ];

  return (
    <div>
      <ExcelFile element={<Button>Exportar para o Excel</Button>}>
        <ExcelSheet dataSet={multiDataSet} name={cardTitle} />
      </ExcelFile>
    </div>
  );
}
