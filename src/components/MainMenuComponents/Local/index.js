import React, { useState, useContext, useEffect, memo } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../../context";
import cleanDeep from "clean-deep";

import FacilitiesSelect from "../../FacilitiesSelect";

import {
  Container,
  Header,
  Order,
  Description,
  ProvincePanel,
  DistrictPanel,
  ClinicPanel,
  LabPanel,
  UseStyles,
  NationalPanel,
} from "./styles";

const Local = memo(({ handleGetLocal }) => {
  const [value, setValue] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [isProvinceEnabled, setIsProvinceEnabled] = useState(false);
  const [isDistrictEnabled, setIsDistrictEnabled] = useState(false);
  const [isClinicEnabled, setIsClinicEnabled] = useState(false);
  const [isLabEnabled, setIsLabEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const { colors } = useContext(ThemeContext);
  // const { handleGetLocal } = useContext(ContextProvider);

  useEffect(() => {
    function loadFacilities() {
      const arrayOfNonEmptyFacilities = Object.keys(cleanDeep(facilities));
      if (arrayOfNonEmptyFacilities.length > 0) {
        handleGetLocal(facilities);
      } else {
        handleGetLocal(null);
      }
    }
    loadFacilities();
  }, [facilities]);

  const useStyles = makeStyles((theme) => ({
    radio: {
      "&$checked": {
        color: colors.primary,
      },
    },
    checked: {},
    FormControl: {
      width: "100%",
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
    setIsClinicEnabled(event.target.value === "clinic");
    setIsDistrictEnabled(event.target.value === "district");
    setIsProvinceEnabled(event.target.value === "province");
    setIsLabEnabled(event.target.value === "lab");
  };

  const handleGetFacilities = (facilities) => {
    setFacilities(facilities);
  };
  return (
    <Container>
      <Header>
        <Order>3</Order>
        <Description>
          <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
        </Description>
      </Header>
      <FormControl className={classes.FormControl} component="fieldset">
        <RadioGroup
          aria-label="local"
          name="local"
          value={value}
          onChange={handleChange}
        >
          <NationalPanel>
            <FormControlLabel
              value="national"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="A nivel Nacional"
            />
          </NationalPanel>
          <ProvincePanel isProvinceEnabled={isProvinceEnabled}>
            <FormControlLabel
              value="province"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Provincia"
            />
            {isProvinceEnabled && (
              <FacilitiesSelect
                isProvinceEnabled={true}
                isDistrictEnabled={false}
                isClinicEnabled={false}
                isLabEnabled={false}
                handleGetFacilities={handleGetFacilities}
              />
            )}
          </ProvincePanel>
          <DistrictPanel isDistrictEnabled={isDistrictEnabled}>
            <FormControlLabel
              value="district"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Distrito"
            />
            {isDistrictEnabled && (
              <FacilitiesSelect
                isProvinceEnabled={true}
                isDistrictEnabled={true}
                isClinicEnabled={false}
                isLabEnabled={false}
                handleGetFacilities={handleGetFacilities}
              />
            )}
          </DistrictPanel>
          <ClinicPanel isClinicEnabled={isClinicEnabled}>
            <FormControlLabel
              value="clinic"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Unidade Sanitaria"
            />
            {isClinicEnabled && (
              <FacilitiesSelect
                isProvinceEnabled={true}
                isDistrictEnabled={true}
                isClinicEnabled={true}
                isLabEnabled={false}
                handleGetFacilities={handleGetFacilities}
              />
            )}
          </ClinicPanel>
          <LabPanel isLabEnabled={isLabEnabled}>
            <FormControlLabel
              value="lab"
              control={
                <Radio
                  classes={{
                    root: classes.radio,
                    checked: classes.checked,
                  }}
                  size="small"
                />
              }
              label="Laboratorio"
            />
            {isLabEnabled && (
              <FacilitiesSelect
                isProvinceEnabled={false}
                isDistrictEnabled={false}
                isClinicEnabled={false}
                isLabEnabled={true}
                handleGetFacilities={handleGetFacilities}
              />
            )}
          </LabPanel>
        </RadioGroup>
      </FormControl>
    </Container>
  );
});

export default Local;

// export default function Local({ active, reportId, params, handleGetLocal }) {
//   const [value, setValue] = useState(null);
//   const [facilities, setFacilities] = useState([]);
//   const [isProvinceEnabled, setIsProvinceEnabled] = useState(false);
//   const [isDistrictEnabled, setIsDistrictEnabled] = useState(false);
//   const [isClinicEnabled, setIsClinicEnabled] = useState(false);
//   const [isLabEnabled, setIsLabEnabled] = useState(false);
//   const [isEnabled, setIsEnabled] = useState(false);

//   const { colors } = useContext(ThemeContext);

//   useEffect(() => {
//     function loadProps() {
//       if (reportId && params) {
//         setIsEnabled(true);
//       } else {
//         setIsEnabled(false);
//       }
//     }
//     loadProps();
//   }, [reportId, params]);

//   useEffect(() => {
//     function loadFacilities() {
//       const arrayOfNonEmptyFacilities = Object.keys(cleanDeep(facilities));
//       if (arrayOfNonEmptyFacilities.length > 0) {
//         handleGetLocal(facilities);
//       } else {
//         handleGetLocal(null);
//       }
//     }
//     loadFacilities();
//   }, [facilities]);

//   const useStyles = makeStyles((theme) => ({
//     radio: {
//       "&$checked": {
//         color: colors.primary,
//       },
//     },
//     checked: {},
//     FormControl: {
//       width: "100%",
//     },
//   }));

//   const classes = useStyles();

//   const handleChange = (event) => {
//     setValue(event.target.value);
//     setIsClinicEnabled(event.target.value === "clinic");
//     setIsDistrictEnabled(event.target.value === "district");
//     setIsProvinceEnabled(event.target.value === "province");
//     setIsLabEnabled(event.target.value === "lab");
//   };

//   const handleGetFacilities = (facilities) => {
//     setFacilities(facilities);
//   };
//   return (
//     <Container active={active} isEnabled={isEnabled}>
//       <Header active={active} isEnabled={isEnabled}>
//         <Order>3</Order>
//         <Description>
//           <p>Neste passo selecione o tipo de relatorio que deseja gerar</p>
//         </Description>
//       </Header>
//       <FormControl
//         disabled={!isEnabled}
//         className={classes.FormControl}
//         style={{ opacity: reportId ? 1 : 0.3 }}
//         component="fieldset"
//       >
//         <RadioGroup
//           aria-label="local"
//           name="local"
//           value={value}
//           onChange={handleChange}
//         >
//           <NationalPanel>
//             <FormControlLabel
//               value="national"
//               control={
//                 <Radio
//                   classes={{
//                     root: classes.radio,
//                     checked: classes.checked,
//                   }}
//                   size="small"
//                 />
//               }
//               label="A nivel Nacional"
//             />
//           </NationalPanel>
//           <ProvincePanel isProvinceEnabled={isProvinceEnabled}>
//             <FormControlLabel
//               value="province"
//               control={
//                 <Radio
//                   classes={{
//                     root: classes.radio,
//                     checked: classes.checked,
//                   }}
//                   size="small"
//                 />
//               }
//               label="Provincia"
//             />
//             {isProvinceEnabled && (
//               <FacilitiesSelect
//                 isProvinceEnabled={true}
//                 isDistrictEnabled={false}
//                 isClinicEnabled={false}
//                 isLabEnabled={false}
//                 handleGetFacilities={handleGetFacilities}
//               />
//             )}
//           </ProvincePanel>
//           <DistrictPanel isDistrictEnabled={isDistrictEnabled}>
//             <FormControlLabel
//               value="district"
//               control={
//                 <Radio
//                   classes={{
//                     root: classes.radio,
//                     checked: classes.checked,
//                   }}
//                   size="small"
//                 />
//               }
//               label="Distrito"
//             />
//             {isDistrictEnabled && (
//               <FacilitiesSelect
//                 isProvinceEnabled={true}
//                 isDistrictEnabled={true}
//                 isClinicEnabled={false}
//                 isLabEnabled={false}
//                 handleGetFacilities={handleGetFacilities}
//               />
//             )}
//           </DistrictPanel>
//           <ClinicPanel isClinicEnabled={isClinicEnabled}>
//             <FormControlLabel
//               value="clinic"
//               control={
//                 <Radio
//                   classes={{
//                     root: classes.radio,
//                     checked: classes.checked,
//                   }}
//                   size="small"
//                 />
//               }
//               label="Unidade Sanitaria"
//             />
//             {isClinicEnabled && (
//               <FacilitiesSelect
//                 isProvinceEnabled={true}
//                 isDistrictEnabled={true}
//                 isClinicEnabled={true}
//                 isLabEnabled={false}
//                 handleGetFacilities={handleGetFacilities}
//               />
//             )}
//           </ClinicPanel>
//           <LabPanel isLabEnabled={isLabEnabled}>
//             <FormControlLabel
//               value="lab"
//               control={
//                 <Radio
//                   classes={{
//                     root: classes.radio,
//                     checked: classes.checked,
//                   }}
//                   size="small"
//                 />
//               }
//               label="Laboratorio"
//             />
//             {isLabEnabled && (
//               <FacilitiesSelect
//                 isProvinceEnabled={false}
//                 isDistrictEnabled={false}
//                 isClinicEnabled={false}
//                 isLabEnabled={true}
//                 handleGetFacilities={handleGetFacilities}
//               />
//             )}
//           </LabPanel>
//         </RadioGroup>
//       </FormControl>
//     </Container>
//   );
// }
