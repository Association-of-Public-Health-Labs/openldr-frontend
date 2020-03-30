import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  @media (min-width: 600px) {
    position: ${props => (props.full ? "relative" : "absolute")};
    position: ${props =>
      props.full ? "relative" : props.fixed ? "fixed" : "absolute"};
    border-radius: ${props => props.borderRadius};
  }
  @media (max-width: 599px) {
    position: fixed;
    border-radius: 0;
  }
`;

export const Menu = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: ${props =>
    props.full
      ? "none"
      : "0 0 0 1px rgba(99, 114, 130, 0.16), 0 8px 16px rgba(27, 39, 51, 0.08)"};
  padding: 5px 20px 20px 20px;
  @media (min-width: 600px) {
    max-height: ${props => (props.full ? "100%" : "auto")};
    max-width: ${props => (props.full ? "100%" : props.fixed ? "60%" : "95%")};
    height: ${props => (props.full ? "100%" : "auto")};
    width: ${props => (props.full ? "100%" : props.fixed ? "60%" : "80%")};
  }
  @media (max-width: 599px) {
    max-height: 94%;
    max-width: 94%;
    height: auto;
    width: 90%;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const MenuTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FacilityOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span.text-search-by {
    margin-right: 10px;
  }
`;

export const Tab = styled.div`
  background-color: ${props =>
    props.status === "active"
      ? hexToRgba(props.theme.colors.primary, "0.1")
      : ""};
  color: ${props =>
    props.status === "active" ? props.theme.colors.primary : ""};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  padding: 0 0 0 5px;
  height: 30px;
  border-radius: 4px;
`;

export const SelectInputArea = styled.div`
  width: 100%;
  height: 40px;
  background-color: grey;
  position: relative;
  display: block;
`;

export const Label = styled.div`
  position: fixed;
  left: 5 !important;
  top: -5 !important;
  z-index: 999;
  height: 10px;
`;

export const MenuCloseButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: none;
  border: none;
`;

export const UseStyles = makeStyles({
  datePicker: {
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "4px",
    borderBottomColor: "#ffffff"
  },
  margin: {
    color: "white"
  },
  iconButton: {
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center"
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8
  },
  radioLabel: {
    fontSize: 8
  }
});

export const Theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#00b000"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    },
    normal: {
      main: "#333333"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  overrides: {
    MuiPickersBasePicker: {
      container: {
        backgroundColor: "#32323c",
        color: "white"
      }
    },
    MuiPickersDay: {
      day: {
        color: "white"
      },
      daySelected: {
        color: "white"
      }
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "#32323c",
        color: "white"
      },
      dayLabel: {
        color: "white"
      }
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 11
      }
    }
  }
});

export const SelectStyles = colors => ({
  control: (provided, state) => ({
    ...provided,
    border: "1px solid " + colors.textInputBorder,
    marginBottom: 15,
    minHeight: 40,
    boxShadow: state.isFocused ? 0 : 0,
    borderColor: state.isFocused ? colors.primary : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? colors.primary : provided.borderColor
    },
    backgroundColor: colors.background.textInput
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: hexToRgba(colors.primary, "0.1"),
    color: colors.primary
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: colors.primary
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? hexToRgba(colors.primary, "0.1")
      : colors.background.secondary,
    "&:hover": {
      backgroundColor: hexToRgba(colors.primary, "0.1"),
      color: colors.primary
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: colors.background.secondary
  })
});
