import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

import { Container, Content, Header, Title, CardMenu, Body } from "./styles";

import Map from "../Map";

export default function MapSamples() {
  const [expandMap, setExpandMap] = useState(false);

  function handleExpandMap() {
    setExpandMap(!expandMap);
  }

  const handleSetZoom = zoom => {};

  return (
    <Container isMapExpanded={expandMap}>
      <Content isMapExpanded={expandMap}>
        <Header>
          <Title>
            <h3>Unidades Sanitarias</h3>
          </Title>

          <CardMenu>
            <ul>
              <li>
                <IconButton
                  onClick={handleExpandMap}
                  aria-label="delete"
                  size="medium"
                >
                  {expandMap ? (
                    <FiMinimize2 size={18} />
                  ) : (
                    <FiMaximize2 size={18} />
                  )}
                </IconButton>
              </li>
            </ul>
          </CardMenu>
        </Header>
        <Body>
          <Map isMapExpanded={expandMap} handleSetZoom={handleSetZoom} />
        </Body>
      </Content>
    </Container>
  );
}
