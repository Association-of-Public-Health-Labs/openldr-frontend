import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Icon } from "./styles";

export default function IconMap({ category, name }) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#00b000",
      color: "white",
      maxWidth: 220,
      width: "auto",
      height: 50,
      fontSize: theme.typography.pxToRem(12),
      marginTop: -70,
      marginLeft: 32
    }
  }))(Tooltip);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <HtmlTooltip
        PopperProps={{
          disablePortal: true
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="bottom"
        title={
          <React.Fragment>
            <h4>{name}</h4>
          </React.Fragment>
        }
      >
        <Icon onClick={handleTooltipOpen}>
          <div className="pin"></div>
          <div className="pulse"></div>
        </Icon>
      </HtmlTooltip>
    </ClickAwayListener>
  );
}
