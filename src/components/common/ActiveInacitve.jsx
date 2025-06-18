import React from "react";
import Select from "react-select";

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      borderRadius: "8px",
      minHeight: "35px",
    }),
    menu: (provided) => ({
      ...provided,
      borderTop: "1px solid #ddd",
      zIndex: 1000,
    }),
    option: (provided, { data }) => ({
      ...provided,
      color: data.value === "create-view" ? "gray" : provided.color,
      zIndex: 1000,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "6px",
    }),
  };


const ActiveInactiveSelect = ({options, setState}) => {
  return (
    <Select
      options={[...options]}
      defaultValue={options[0]}
      onChange={(selectedOption) => setState(selectedOption.value)}
      styles={customStyles}
    />
  );
};

export default ActiveInactiveSelect;
