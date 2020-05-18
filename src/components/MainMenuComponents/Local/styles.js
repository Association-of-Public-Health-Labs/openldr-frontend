import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background.secondary};
  width: 100%;
  padding: 10px;
  height: 100%;
`;

export const NationalPanel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

export const ProvincePanel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${(props) =>
    props.isProvinceEnabled
      ? props.theme.colors.background.primary
      : "transparent"};
`;

export const DistrictPanel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${(props) =>
    props.isDistrictEnabled
      ? props.theme.colors.background.primary
      : "transparent"};
`;

export const ClinicPanel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${(props) =>
    props.isClinicEnabled
      ? props.theme.colors.background.primary
      : "transparent"};
`;

export const LabPanel = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  background-color: ${(props) =>
    props.isLabEnabled ? props.theme.colors.background.primary : "transparent"};
`;

export const UseStyles = makeStyles((theme) => ({
  FormControl: {
    width: "100%",
  },
}));

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Order = styled.h1`
  font-size: 50px;
  line-height: 50px;
  padding: 0;
  margin-right: 6px;
  color: ${(props) => hexToRgba(props.theme.colors.text, "0.3")};
`;

export const Description = styled.div`
  padding-top: 5px;
  p {
    font-size: 13px;
  }
`;
