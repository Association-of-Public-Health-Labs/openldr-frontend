import React, { useState, useContext } from "react";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import ContextProvider from "../../../context";
import { ThemeContext } from "styled-components";

import {
  FiGrid,
  FiThermometer,
  FiMapPin,
  FiMoreHorizontal,
  FiEye,
} from "react-icons/fi";

import {
  Container,
  Content,
  MenuItems,
  MenuConfig,
  Config,
  MenuTooltipPanel,
  ThemeSwitch,
  UseStyles,
} from "./styles";

const MenuTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "transparent",
  },
}))(Tooltip);

export default function SideBar(props) {
  const classes = UseStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isLabelOn, setIsLabelOn] = useState(false);
  const menu = props.menu;
  const active = props.active || null;

  const { toogleTheme, toogleLabels, isLabelVisible, size } = useContext(
    ContextProvider
  );
  const { title } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(title === "dark" ? true : false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSetMenuLabel(status) {
    toogleLabels();
  }

  function handleSetTheme(status) {
    setIsDark(status);
    toogleTheme();
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Container isLabelOn={isLabelVisible}>
      <Content>
        <MenuItems isLabelOn={isLabelVisible}>
          {menu.map((item) => {
            return (
              <MenuTooltip
                placement="right"
                disableHoverListener={isLabelVisible}
                title={
                  <MenuTooltipPanel>
                    <h5>{item.menuTitle}</h5>
                  </MenuTooltipPanel>
                }
              >
                <li>
                  <a
                    className={active === item.id ? "active" : ""}
                    href={item.url}
                  >
                    {item.icon}
                    <span>{item.menuTitle}</span>
                  </a>
                </li>
              </MenuTooltip>
            );
          })}
        </MenuItems>
        <MenuConfig>
          <li>
            <IconButton
              aria-describedby={id}
              variant="contained"
              color="default"
              onClick={handleClick}
              aria-label="options"
            >
              <FiMoreHorizontal size={16} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Config>
                <li>
                  <FormControl row>
                    <FormGroup row>
                      <FormControlLabel
                        value="Dark mode"
                        control={
                          <ThemeSwitch
                            checked={isDark}
                            onChange={() => handleSetTheme(!isDark)}
                            value="checkedA"
                            size="small"
                            themeColor="#00b000"
                            label="Dark mode"
                          />
                        }
                        label="Dark mode"
                      />
                    </FormGroup>
                  </FormControl>
                </li>
                <li>
                  <FormControl row>
                    <FormGroup row>
                      <FormControlLabel
                        value="Dark mode"
                        control={
                          <ThemeSwitch
                            checked={isLabelVisible}
                            onChange={() => handleSetMenuLabel(!isLabelVisible)}
                            value="checkedA"
                            //   inputProps={{ "aria-label": "secondary checkbox" }}
                            size="small"
                            themeColor="#00b000"
                            label="Dark mode"
                          />
                        }
                        label="Mostrar Legenda"
                      />
                    </FormGroup>
                  </FormControl>
                </li>
              </Config>
            </Popover>
          </li>
        </MenuConfig>
      </Content>
    </Container>
  );
}
