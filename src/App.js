import React, { useState, useEffect } from 'react';
import convert from 'convert-units';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DropDownSelector from './components/DropDownSelector';
import InputValueField from './components/InputValueField';

const App = () => {
  const [unitConverter, setUnitConverter] = useState({
    parameterSelector: '',
    firstUnit: '',
    secondUnit: '',
    firstValue: 0,
    secondValue: 0,
    direction: '',
  });

  const generateparameterSelector = () => {
    console.log(unitConverter);
    return convert()
      .measures()
      .map((ele) => ele[0].toUpperCase() + ele.slice(1));
  };

  const handleParameterSelector = (event) => {
    event.preventDefault();

    console.log(event.target.value);
    setUnitConverter({
      parameterSelector: event.target.value,
      firstUnit: '',
      secondUnit: '',
      firstValue: 0,
      secondValue: 0,
      direction: '',
    });
  };

  const handleSelector = (event) => {
    const { name, value } = event.target;

    if (name === 'firstUnit' || name === 'secondUnit') {
      setUnitConverter({ ...unitConverter, direction: '' }); // Reset flow when changing quantity
    }
    setUnitConverter({
      ...unitConverter,
      firstValue: 0,
      secondValue: 0,
      direction: '',
      [event.target.name]: value,
    });
  };

  const handleInputValueFields = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUnitConverter((prevState) => ({
      ...prevState,
      direction: name === 'firstValue' ? 'L2R' : 'R2L',
      [name]: value,
    }));
  };

  const handleConversion = () => {
    const { direction, firstValue, secondValue, firstUnit, secondUnit } =
      unitConverter;
    if (direction === 'L2R') {
      setUnitConverter((prevState) => ({
        ...prevState,
        secondValue: convert(firstValue).from(firstUnit).to(secondUnit),
      }));
    } else if (direction === 'R2L') {
      setUnitConverter((prevState) => ({
        ...prevState,
        firstValue: convert(secondValue).from(secondUnit).to(firstUnit),
      }));
    }
  };

  useEffect(() => {
    if (unitConverter.direction !== '') {
      handleConversion();
    }
  }, [
    unitConverter.direction,
    unitConverter.firstUnit,
    unitConverter.secondUnit,
    unitConverter.firstValue,
    unitConverter.secondValue,
  ]);

  return (
    <Container>
      <Grid container justify='center' align='center' spacing={3}>
        <DropDownSelector
          data={{
            size: 12,
            label: 'Parameter Selection',
            parameters: convert().measures(),
            populateType: 'parameterSelector',
            populateWith: generateparameterSelector(),
            selectedValue: unitConverter.parameterSelector, //parameterSelector,
          }}
          handleSelector={handleParameterSelector}
        />
        {unitConverter.parameterSelector ? (
          <>
            <DropDownSelector
              data={{
                size: 6,
                label: 'Unit',
                populateType: 'firstUnit',
                populateWith: convert().list(unitConverter.parameterSelector),
                selectedValue: unitConverter.firstUnit,
              }}
              handleSelector={handleSelector}
            />
            <DropDownSelector
              data={{
                size: 6,
                label: 'Unit',
                populateType: 'secondUnit',
                populateWith: convert().list(unitConverter.parameterSelector),
                selectedValue: unitConverter.secondUnit,
              }}
              handleSelector={handleSelector}
            />
          </>
        ) : (
          <></>
        )}
        {unitConverter.firstUnit && unitConverter.secondUnit ? (
          <>
            <InputValueField
              data={{
                currentValue: unitConverter.firstValue,
                input: unitConverter.firstUnit,
                label: unitConverter.firstUnit,
                name: 'firstValue',
              }}
              handleInput={handleInputValueFields}
            />
            <InputValueField
              data={{
                currentValue: unitConverter.secondValue,
                input: unitConverter.secondUnit,
                label: unitConverter.secondUnit,
                name: 'secondValue',
              }}
              handleInput={handleInputValueFields}
            />
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
};

export default App;
