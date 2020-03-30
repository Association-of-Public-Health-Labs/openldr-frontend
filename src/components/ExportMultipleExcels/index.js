import React, { useContext } from "react";
import ReactExport from "react-export-excel";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardContext from "../../context";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// import { Container } from './styles';

const useStyles = makeStyles({
  list: {
    width: 550
  },
  fullList: {
    width: "auto"
  },
  drawerButton: {
    textTransform: "unset",
    marginLeft: 10
  }
});

export default function ExportMultipleExcels() {
  const { reports } = useContext(CardContext);
  return (
    <div>
      <ExcelFile
        element={
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ color: "white", marginLeft: 10, textTransform: "unset" }}
            disableElevation
          >
            Exportar para Excel
          </Button>
        }
      >
        {reports.map(report => {
          const multiDataSet = [
            {
              columns: report[0].excelLabels,
              data: report[0].excelData
            }
          ];
          return (
            <ExcelSheet dataSet={multiDataSet} name={report[0].cardTitle} />
          );
        })}
      </ExcelFile>
    </div>
  );
}
