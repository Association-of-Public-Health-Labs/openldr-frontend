import React, { useContext, useState, useEffect } from "react";
import WindowedSelect from "react-windowed-select";
import { components, createFilter } from "react-windowed-select";
import { ThemeContext } from "styled-components";
import ContextProvider from "../../context";

import { SelectStyles } from "./styles";

const customFilter = createFilter({ ignoreAccents: false });
const customComponents = {
  ClearIndicator: props => (
    <components.ClearIndicator {...props}>clear</components.ClearIndicator>
  )
};

export default function FacilitiesSelect({
  isProvinceEnabled,
  isDistrictEnabled,
  isClinicEnabled,
  isLabEnabled,
  handleGetFacilities
}) {
  const { colors } = useContext(ThemeContext);
  const customStyles = SelectStyles(colors);
  const { clinicsList, districtsList, labsList } = useContext(ContextProvider);

  const districtOptions = [],
    clinicOptions = [],
    labsOptions = [];

  const provincesOptions = [
    { value: "Niassa", label: "Niassa" },
    { value: "Cabo Delgado", label: "Cabo Delgado" },
    { value: "Nampula", label: "Nampula" },
    { value: "Zambezia", label: "Zambezia" },
    { value: "Tete", label: "Tete" },
    { value: "Manica", label: "Manica" },
    { value: "Sofala", label: "Sofala" },
    { value: "Inhambane", label: "Inhambane" },
    { value: "Gaza", label: "Gaza" },
    { value: "Maputo Cidade", label: "Maputo Cidade" },
    { value: "Maputo Provincia", label: "Maputo Provincia" }
  ];

  clinicsList.map(clinic =>
    clinicOptions.push({
      value: clinic.Description,
      label: clinic.Description
    })
  );

  districtsList.map(district =>
    districtOptions.push({
      value: district.DistrictName,
      label: district.DistrictName
    })
  );

  labsList.map(lab =>
    labsOptions.push({
      value: lab.LabCode,
      label: lab.LabName
    })
  );

  const [provinces, setProvinces] = useState(provincesOptions);
  const [districts, setDistricts] = useState(districtOptions);
  const [clinics, setClinics] = useState(clinicOptions);
  const [labs, setLabs] = useState(labsOptions);

  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedClinics, setSelectedClinics] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);

  async function handleChangeProvinces(provinces) {
    setSelectedProvinces(provinces);
    if (provinces) {
      const districtsArray = await districtsList.filter(district =>
        provinces.some(province => province.value === district.ProvinceName)
      );
      const updatedDistrictArray = [];
      districtsArray.map(district =>
        updatedDistrictArray.push({
          value: district.DistrictName,
          label: district.DistrictName
        })
      );
      setDistricts(updatedDistrictArray);

      const clinicsArray = await clinicsList.filter(clinic => {
        if (typeof selectedDistricts !== undefined) {
          if (selectedDistricts.length === 0) {
            return provinces.some(
              province => province.value === clinic.ProvinceName
            );
          } else {
            return selectedDistricts.some(
              district => district.value === clinic.DistrictName
            );
          }
        } else {
          return provinces.some(
            province => province.value === clinic.ProvinceName
          );
        }
      });
      const updatedClinicArray = [];
      clinicsArray.map(clinic =>
        updatedClinicArray.push({
          value: clinic.Description,
          label: clinic.Description
        })
      );
      setClinics(updatedClinicArray);
    }
  }

  useEffect(() => {
    function loadFacilities() {
      return handleGetFacilities({
        labs: selectedLabs,
        provinces: selectedProvinces,
        districts: selectedDistricts,
        clinics: selectedClinics
      });
    }
    loadFacilities();
  }, [selectedLabs, selectedProvinces, selectedDistricts, selectedClinics]);

  async function handleChangeDistricts(districts) {
    setSelectedDistricts(districts);
    if (districts) {
      const clinicsArray = await clinicsList.filter(clinic => {
        if (districts.lenght === 0) {
          return selectedProvinces.some(
            province => province.value === clinic.ProvinceName
          );
        } else {
          return districts.some(
            district => district.value === clinic.DistrictName
          );
        }
      });
      const updatedClinicArray = [];
      clinicsArray.map(clinic =>
        updatedClinicArray.push({
          value: clinic.Description,
          label: clinic.Description
        })
      );
      setClinics(updatedClinicArray);
    }
  }

  function handleChangeClinics(clinics) {
    setSelectedClinics(clinics);
  }
  function handleChangeLabs(labs) {
    setSelectedLabs(labs);
  }

  return (
    <>
      {(isProvinceEnabled || isDistrictEnabled || isClinicEnabled) &&
        !isLabEnabled && (
          <WindowedSelect
            closeMenuOnSelect={false}
            styles={customStyles}
            components={customComponents}
            isMulti
            options={provinces}
            menuPlacement="auto"
            menuPosition="fixed"
            isClearable={true}
            onChange={handleChangeProvinces}
            placeholder="Selecione a Provincia"
          />
        )}
      {(isDistrictEnabled || isClinicEnabled) && !isLabEnabled && (
        <WindowedSelect
          styles={customStyles}
          components={customComponents}
          isMulti
          options={districts}
          menuPlacement="auto"
          menuPosition="fixed"
          isClearable={true}
          onChange={handleChangeDistricts}
          placeholder="Selecione o Distrito"
        />
      )}
      {isClinicEnabled && !isLabEnabled && (
        <WindowedSelect
          components={customComponents}
          styles={customStyles}
          filterOption={customFilter}
          options={clinics}
          isMulti
          isClearable={true}
          menuPlacement="auto"
          menuPosition="fixed"
          onChange={handleChangeClinics}
          placeholder="Selecione a US"
        />
      )}
      {isLabEnabled && (
        <WindowedSelect
          styles={customStyles}
          components={customComponents}
          isMulti
          options={labs}
          menuPlacement="auto"
          menuPosition="fixed"
          isClearable={true}
          onChange={handleChangeLabs}
          placeholder="Selecione o Laboratorio"
        />
      )}
    </>
  );
}
