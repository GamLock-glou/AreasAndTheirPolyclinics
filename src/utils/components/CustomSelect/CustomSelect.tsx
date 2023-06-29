import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

type CustomSelectType = {
  valueKey: string;
  value: string;
  type: string;
  menu: string[] | number[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const CustomSelect = ({value, menu, type, valueKey, setFieldValue}: CustomSelectType) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(valueKey, event.target.value)
  };
  return (
    <FormControl variant="filled">
      <InputLabel id="demo-simple-select-standard-label">{type}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        label={type}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {menu.map((value)=><MenuItem key={value} value={value}>
          {value}
        </MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;