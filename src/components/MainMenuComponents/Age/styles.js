import styled from "styled-components";

export const Container = styled.div`
  padding-left: 20px;
`;

export const SpecifyAge = styled.div`
  background-color: ${(props) =>
    props.isAgeEditable ? `#f4f4f4` : props.theme.colors.background.secondary};
  padding-left: ${(props) => (props.isAgeEditable ? `10px` : 0)};
  padding-right: ${(props) => (props.isAgeEditable ? `10px` : 0)};
  border-radius: ${(props) => (props.isAgeEditable ? `4px` : 0)};
`;

export const Divider = styled.div`
  border-top: 1px solid #cecece;
  width: 100%;
  position: relative;
  span {
    position: absolute;
    left: CALC(50% - 15px);
    top: -8px;
    font-size: 10px;
    background-color: ${(props) => props.theme.colors.background.secondary};
    text-transform: uppercase;
    width: 30px;
    text-align: center;
  }
  margin-bottom: 5px;
`;

export const AgeGroups = styled.div`
  background-color: ${(props) =>
    props.isAgeGroup ? `#f4f4f4` : props.theme.colors.background.secondary};
  padding-left: ${(props) => (props.isAgeGroup ? `10px` : 0)};
  padding-right: ${(props) => (props.isAgeGroup ? `10px` : 0)};
  border-radius: ${(props) => (props.isAgeGroup ? `4px` : 0)};
  .age-group-checkboxes {
    display: ${(props) => (props.isAgeGroup ? `block` : `none`)};
    padding-left: 20px;
  }
`;
