import React, { PropTypes } from 'react';

function Button({ onSubmitCity, children }) {
  return (
    <button type='button'
      style={{ margin: 10 }}
      className='btn btn-success'
      onClick={onSubmitCity}>
          {children}
    </button>
  );
}

function InputField({ onUpdateCity, city }) {
  return (
    <input
      className='form-control'
      onChange={onUpdateCity}
      placeholder='Portland, Oregon'
      type='text'
      value={city}/>
  );
}

function getStyles({ direction }) {
  return {
    display: 'flex',
    flexDirection: direction || 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 300,
    alignSelf: 'right',
  };
}

function GetCity({ onUpdateCity, onSubmitCity, city, direction }) {
  return (
    <div style={getStyles({ direction })}>
      <InputField
        onUpdateCity={onUpdateCity}
        city={city}/>
      <Button
        onSubmitCity={onSubmitCity}>
          Get Weather
      </Button>
    </div>
  );
}

GetCity.propTypes = {
  direction: PropTypes.string,
  onSubmitCity: PropTypes.func.isRequired,
  onUpdateCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,

};

export default GetCity;
