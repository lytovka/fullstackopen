import React from "react";

const Input = ({ name, placeholder, onChangeFunc }) => {
  return(
        <>
        <input name={name} placeholder={placeholder} onChange={onChangeFunc}/> <br />
        </>
  );
};

export default Input;