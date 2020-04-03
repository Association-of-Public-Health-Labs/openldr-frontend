import hexToRgba from "hex-to-rgba";

export const SelectStyles = colors => ({
  control: (provided, state) => ({
    ...provided,
    border: "1px solid " + colors.textInputBorder,
    marginBottom: 15,
    minHeight: 40,
    boxShadow: state.isFocused ? 0 : 0,
    borderColor: state.isFocused ? colors.primary : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? colors.primary : provided.borderColor
    },
    backgroundColor: colors.background.textInput
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: hexToRgba(colors.primary, "0.1"),
    color: colors.primary
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: colors.primary
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected
      ? hexToRgba(colors.primary, "0.1")
      : colors.background.secondary,
    "&:hover": {
      backgroundColor: hexToRgba(colors.primary, "0.1"),
      color: colors.primary
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: colors.background.secondary
  })
});
