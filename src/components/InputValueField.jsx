import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

const InputValueField = (props) => {
  const { label, currentValue, name, input } = props.data;
  return (
    <Grid item xs={6}>
      <TextField
        variant='outlined'
        label={label}
        value={currentValue}
        name={name}
        onChange={props.handleInput}
        InputProps={{
          endAdornment: <InputAdornment position='end'>{input}</InputAdornment>,
        }}
        style={{ width: '100%' }}
      />
    </Grid>
  );
};

export default InputValueField;
