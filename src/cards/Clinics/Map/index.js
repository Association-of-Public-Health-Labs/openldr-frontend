import React, { useState, useContext } from "react";
import * as geolib from "geolib";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  OverlayView
} from "react-google-maps";
import { ThemeContext } from "styled-components";
import hexToRgba from "hex-to-rgba";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { FiPlus, FiMinus } from "react-icons/fi";

import IconMap from "../../../components/IconMap";
import mapStylesLight from "../../../styles/themes/mapLight";
import mapStylesDark from "../../../styles/themes/mapDark";

import { ZoomControl, Theme } from "./styles";

export default function Map({ isMapExpanded, handleSetZoom }) {
  const [zoom, setZoom] = useState(13);
  const [expandMap, setExpandMap] = useState(false);
  const theme = Theme();
  const { title } = useContext(ThemeContext);
  const { colors } = useContext(ThemeContext);

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2)
  });

  const labs = [
    {
      labCode: "PJV",
      labName: "Lab. Jose Macamo",
      latitude: -25.9482195,
      longitude: 32.5414244,
      totalSamples: 16000,
      tat: 15
    }
  ];

  const clinics = [
    {
      clinicCode: "ALTMC",
      clinicName: "CS Alto Mae",
      latitude: -25.9608221,
      longitude: 32.5688425,
      totalSamples: 8000,
      tat: 18,
      labs: [
        {
          labCode: "PJV",
          labName: "Lab. Jose Macamo",
          latitude: -25.9482195,
          longitude: 32.5414244,
          totalSamples: 16000,
          tat: 15
        }
      ]
    },
    {
      clinicCode: "MALHA",
      clinicName: "CS Malhangalene",
      latitude: -25.956331,
      longitude: 32.5805453,
      totalSamples: 8000,
      tat: 18,
      labs: [
        {
          labCode: "PJV",
          labName: "Lab. Jose Macamo",
          latitude: -25.9482195,
          longitude: 32.5414244,
          totalSamples: 16000,
          tat: 15
        }
      ]
    }
  ];

  function handleZoomChanged() {
    setZoom(this.getZoom());
  }

  const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        zoom={zoom}
        defaultCenter={{ lat: -25.9482195, lng: 32.5414244 }}
        options={{
          styles: title === "light" ? mapStylesLight : mapStylesDark,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false
        }}
        onZoomChanged={handleZoomChanged}
      >
        {labs.map(lab => (
          <OverlayView
            position={{ lat: lab.latitude, lng: lab.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <div
              style={{
                width: 40,
                height: 40,
                marginBottom: 35,
                marginLeft: 9,
                position: "relative"
              }}
            >
              <IconMap category="lab" name={lab.labName} />
            </div>
          </OverlayView>
        ))}
        {/* <OverlayView
        position={{ lat: coord.latitude, lng: coord.longitude }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <div>
          <span
            style={{
              backgroundColor: "#00b000",
              color: "white",
              borderRadius: 5,
              padding: 5
            }}
          >
            160000 (56%)
          </span>
        </div>
      </OverlayView> */}
        {/* <Polyline
        path={[
          { lat: -34.397, lng: 150.644 },
          { lat: -25.8962418, lng: 32.5406432 }
        ]}
        options={{
          strokeColor: "#000000",
          strokeOpacity: 1,
          strokeWeight: 2,
          icons: [
            {
              icon: "hello",
              offset: "0",
              repeat: "10px"
            }
          ]
        }}
      /> */}
        {clinics.map(clinic => {
          const { labs } = clinic;
          return labs.map(lab => {
            const coord = geolib.getCenterOfBounds([
              { latitude: clinic.latitude, longitude: clinic.longitude },
              { latitude: lab.latitude, longitude: lab.longitude }
            ]);
            return (
              <>
                <OverlayView
                  position={{ lat: clinic.latitude, lng: clinic.longitude }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={getPixelPositionOffset}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      marginBottom: 35,
                      marginLeft: 9,
                      position: "relative"
                    }}
                  >
                    <IconMap category="lab" name={clinic.clinicName} />
                  </div>
                </OverlayView>
                {zoom > 11 && (
                  <>
                    <OverlayView
                      position={{ lat: coord.latitude, lng: coord.longitude }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      getPixelPositionOffset={getPixelPositionOffset}
                    >
                      <div>
                        <span
                          style={{
                            backgroundColor: "#00b000",
                            color: "white",
                            borderRadius: 5,
                            padding: 5
                          }}
                        >
                          160000 (56%)
                        </span>
                      </div>
                    </OverlayView>
                    <Polyline
                      path={[
                        { lat: clinic.latitude, lng: clinic.longitude },
                        { lat: lab.latitude, lng: lab.longitude }
                      ]}
                      options={{
                        strokeColor: hexToRgba("#00b000", "0.6"),
                        strokeOpacity: 1,
                        strokeWeight: 1
                      }}
                    />
                  </>
                )}
              </>
            );
          });
        })}
      </GoogleMap>
    ))
  );

  return (
    <>
      <ZoomControl>
        <ThemeProvider theme={theme}>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
            size="small"
          >
            <Button onClick={() => setZoom(zoom + 1)}>
              <FiPlus size={16} />
            </Button>
            <Button onClick={() => setZoom(zoom - 1)}>
              <FiMinus size={16} />
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </ZoomControl>
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA00jWGcj9stXwOh_mdwR2CpVZS5sw7A9A&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={
          <div
            style={{
              height: `100%`,
              width: `100%`,
              borderRadius: isMapExpanded ? 0 : 10,
              border: !isMapExpanded && "0.6px solid" + colors.textInputBorder
            }}
          />
        }
      />
    </>
  );
}
