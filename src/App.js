import React, { useState } from "react";
import Routes from "./routes";

import { ThemeProvider } from "styled-components";
import ToogleContext from "./context";
import usePersistedState from "./utils/usePersistedState";
import useWindowSize from "./utils/useWindowSize";

import GlobalStyle from "./styles/global";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import { materialUI } from "./styles/themes/material-ui";

import "./App.css";

function App() {
  const [theme, setTheme] = usePersistedState("theme", light);
  const [labels, setLabels] = usePersistedState("labels", false);
  const [reports, setReports] = usePersistedState("reports", []);
  const materialUITheme = materialUI(theme);
  const size = useWindowSize();

  const toogleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  const toogleLabels = () => {
    setLabels(labels ? false : true);
  };

  const handleAddReport = report => {
    setReports([...reports, report]);
  };

  const handleRemoveAllReports = reports => {
    setReports([]);
  };

  return (
    <ToogleContext.Provider
      value={{
        toogleTheme: toogleTheme,
        toogleLabels: toogleLabels,
        isLabelVisible: labels,
        materialUI: materialUITheme,
        size: size,
        handleAddReport: handleAddReport,
        handleRemoveAllReports: handleRemoveAllReports,
        reports: reports
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </ToogleContext.Provider>
  );
}

export default App;
