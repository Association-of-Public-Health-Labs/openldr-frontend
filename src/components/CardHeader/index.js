import React, { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

import CardOptions from "../Menus/CardOptions";
import EditButton from "../MaterialUI/EditButton";
import IconBtn from "../MaterialUI/IconBtn";

import { Container, CardTitle, CardMenu, CardLabels, Label } from "./styles";

export default function CardHeader(props) {
  return (
    <Container>
      <CardTitle>
        <h5>{props.label}</h5>
        <h3>{props.title}</h3>
      </CardTitle>
      <CardMenu>
        <EditButton openMenu={props.editButtonEvent} />
        {props.expandable && (
          <IconBtn
            event={props.handleExpandCard}
            icon={
              props.isExpanded ? (
                <FiMinimize2 size={16} />
              ) : (
                <FiMaximize2 size={16} />
              )
            }
          />
        )}
        <CardOptions />
      </CardMenu>
    </Container>
  );
}
