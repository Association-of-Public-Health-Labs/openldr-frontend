import {downloadExcel} from "react-export-table-to-excel";

export default function handleDownloadExcel(filename, sheet,header, body) {
  downloadExcel({
    fileName: filename,
    sheet: sheet,
    tablePayload: {
      header,
      body
    },
  });
}