import React from "react";
import PropTypes from "prop-types";

import css from './Filter.module.css';

export const Filter = ({value, onChangeFilter}) => {
return (
    <label className={css.filterLable}>
    Find contacts by name
    <input className={css.filterInput} text="text" value={value} onChange={onChangeFilter}></input>
  </label>
)
}
Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}