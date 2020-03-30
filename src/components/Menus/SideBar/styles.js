import styled from "styled-components";
import hexToRgba from "hex-to-rgba";
import Switch from "@material-ui/core/Switch";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  height: 100%;
  left: 0;
  position: absolute;

  @media (min-width: 1550px) {
    width: 250px;
    padding: ${props =>
      props.isLabelOn ? "40px 80px 40px 80px" : "40px 85px 40px 85px"};
  }

  @media (min-width: 600px) and (max-width: 1549px) {
    display: block;
    width: 150px;
    padding: ${props => (props.isLabelOn ? "40px 30px 40px 30px" : "40px")};
  }

  @media (max-width: 599px) {
    display: none;
    width: 150px;
    padding: ${props => (props.isLabelOn ? "40px 30px 40px 30px" : "40px")};
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 15px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MenuItems = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0;
  width: 100%;

  li a {
    width: 100%;
    height: ${props => (props.isLabelOn ? "70px" : "50px")};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    color: #aaaaaa;
    text-decoration: none;
    span {
      font-size: 9px;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 5px;
      display: ${props => (props.isLabelOn ? "block" : "none")};
    }
    &.active {
      color: #00b000;
      background-color: ${hexToRgba("#00b000", "0.08")};
    }
  }
`;

export const MenuConfig = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 0;
  width: 100%;

  li {
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 10px;
    margin-bottom: 5px;
    color: #aaaaaa;
    cursor: pointer;
  }
`;

export const Config = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0;
  background-color: ${props => props.theme.colors.background.secondary};
  li {
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.text};
    div.showLabelIcon {
      height: 100%;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 10px;
    }
    &:hover {
      background-color: ${props => props.theme.colors.background.primary};
      color: ${props => props.theme.colors.text};
    }
  }
`;

export const MenuTooltipPanel = styled.div`
  background-color: ${props => props.theme.colors.primary};
  padding: 5px;
  color: white;
  border-radius: 5px;
  margin-left: -8px;
  h5 {
    font-size: 10px;
    text-transform: uppercase;
  }
`;

export const ThemeSwitch = withStyles({
  switchBase: {
    color: "#dddddd",
    "&$checked": {
      color: props => props.themeColor
    },
    "&$checked + $track": {
      backgroundColor: props => props.themeColor
    }
  },
  checked: {
    color: "#dddddd",
    "&$checked": {
      color: props => props.themeColor
    },
    "&$checked + $track": {
      backgroundColor: props => props.themeColor
    }
  },
  track: {
    color: "#dddddd",
    "&$checked": {
      color: props => props.themeColor
    },
    "&$checked + $track": {
      backgroundColor: props => props.themeColor
    }
  }
})(Switch);

export const UseStyles = makeStyles({
  formSwitcher: {
    width: "100%",
    padding: "0"
  }
});
