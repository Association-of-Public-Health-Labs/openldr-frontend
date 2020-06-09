import styled from "styled-components";
import hexToRgba from "hex-to-rgba";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(99, 114, 130, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Popup = styled.div`
  max-width: 80%;
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  color: ${(props) => props.theme.colors.text};
  @media (min-width: 600px) {
    width: 50%;
  }
  @media (max-width: 599px) {
    min-width: 96%;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.primary};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${(props) => props.theme.colors.text};
  .title {
    text-transform: uppercase;
    color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
  }
`;

export const Body = styled.div`
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
`;

export const CodePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const NamePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ResultPanel = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.text};
  /* align-items: center; */
  /* justify-content: flex-start; */
`;

export const Emoji = styled.div`
  width: 60px;
  height: 60px;
  margin-top: -10px;
`;

export const PatientDataList = styled.table`
  tr {
    height: 40px;
    .list-label {
      text-transform: uppercase;
      color: ${(props) => hexToRgba(props.theme.colors.text, "0.4")};
    }
    .list-value {
      font-size: 15px;
      font-weight: bold;
      color: ${(props) => props.theme.colors.text};
    }
  }
`;
