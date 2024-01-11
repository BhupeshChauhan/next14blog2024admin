import {
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

type Props = {
  value?: any;
  onChange?: any;
  menuArray?: any;
  fullWidth?: any;
  handleChange?: any;
  name?: any;
  multiple?: any;
  placeholder?: any;
  error?: any;
  helperText?: any;
};

const CustomSelect = ({
  value,
  handleChange,
  menuArray,
  fullWidth,
  name,
  multiple,
  placeholder,
  error,
  helperText,
}: Props) => {
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    if (multiple) {
      handleChange(typeof value === "string" ? value.split(",") : value, name);
    } else {
      handleChange(value, name);
    }
  };
  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <Select
        id="demo-simple-select"
        value={value}
        displayEmpty
        onChange={onChange}
        name={name}
        multiple={multiple}
        input={<OutlinedInput />}
        inputProps={{ "aria-label": "Without label" }}
        renderValue={(selected) => {
          if (multiple) {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }
            return selected.join(", ");
          } else {
            if (!selected) {
              return <em>{placeholder}</em>;
            }
            return selected;
          }
        }}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {menuArray?.map((element: any, index: any) => (
          <MenuItem key={index} value={element.name}>
            {element.name}
          </MenuItem>
        ))}
      </Select>
      {error ? <FormHelperText> {helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default CustomSelect;
