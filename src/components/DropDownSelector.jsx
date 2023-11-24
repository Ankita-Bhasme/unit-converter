//////
import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const DropDownSelector = (props) => {
  return (
    <Grid item xs={props.data.size}>
      <FormControl variant='outlined' style={{ width: '100%' }}>
        <InputLabel>{props.data.label}</InputLabel>
        <Select
          value={props.data.selectedValue}
          onChange={props.handleSelector}
          inputProps={{ name: props.data.populateType }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {props.data.populateType === 'parameterSelector'
            ? props.data.populateWith.map((element, index) => (
                <MenuItem value={props.data.parameters[index]} key={index}>
                  {element}
                </MenuItem>
              ))
            : props.data.populateWith.map((element) => (
                <MenuItem value={element.abbr} key={element.abbr}>
                  {element.plural}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DropDownSelector;
