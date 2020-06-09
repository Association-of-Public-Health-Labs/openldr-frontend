// import { useState, useEffect } from "react";
import stringify from "json-stringify-safe";
import CircularJSON from "circular-json";
import api from "../services/api";

async function reportPersisted(reports) {
  const user = localStorage.getItem("@RAuth:user");
  const { data } = await api.get(`/show_report/${user}`);
  var r = null;
  if (data?.report) {
    r = CircularJSON.parse(data.report);
    console.log(r);
  } else {
    await api.post(`/create_report`, {
      email: user,
      report: CircularJSON.stringify(reports),
    });
  }

  // console.log(r)

  // const [state, setState] = useState(async () => {
  //   const user = localStorage.getItem("@RAuth:user");
  //   const { data } = await api.get(`/show_report/${user}`);

  //   if (data?.report) {
  //     return CircularJSON.parse(data.report);
  //   } else {
  //     return initialState;
  //   }
  // });

  // useEffect(() => {
  //   async function setReportState() {
  //     const user = localStorage.getItem("@RAuth:user");
  //     const { data } = await api.get(`/show_report/${user}`);
  //     console.log(user, CircularJSON.stringify(state));
  //     if (!data?.email) {
  //       await api.post(`/create_report`, {
  //         email: user,
  //         report: CircularJSON.stringify(state),
  //       });
  //     } else {
  //       await api.post(`/update_report`, {
  //         email: user,
  //         report: CircularJSON.stringify(state),
  //       });
  //     }
  //   }
  //   setReportState();
  // }, [state]);

  // return [state, setState];
}

export default reportPersisted;
