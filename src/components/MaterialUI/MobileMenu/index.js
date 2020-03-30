import React, { useState, useContext } from "react";

import Menu from "../../../utils/menuConfig";

import { Popover, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { IoIosMenu } from "react-icons/io";
import {
  FiGrid,
  FiThermometer,
  FiMapPin,
  FiMoreHorizontal,
  FiEye
} from "react-icons/fi";

import DateRange from "../DateRange";
import MenuDashboard from "../MenuDashboardType";

import { Container, MenuContainer, Item, SecondaryPanel } from "./styles";

export default function MobileMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menu = Menu;
  const active = props.active;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container>
      <IconButton
        aria-label="menu"
        aria-describedby={id}
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        <IoIosMenu size={18} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
      >
        <MenuContainer>
          <Grid container spacing={3}>
            {menu.map(item => {
              return (
                <Grid item xs={3}>
                  <Item
                    href={item.url}
                    className={active === item.id && "active"}
                  >
                    {item.icon}
                    <span>{item.menuTitle}</span>
                  </Item>
                </Grid>
              );
            })}
          </Grid>
          <SecondaryPanel>
            <DateRange />
            <MenuDashboard />
          </SecondaryPanel>
        </MenuContainer>
      </Popover>
    </Container>
  );
}
