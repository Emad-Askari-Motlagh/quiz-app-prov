import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import styles from "./input.module.scss";

export default function Input({
  label,
  placeholder,
  type,
  name,
  handleChange,
  onBlur,
  value,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
      />
    </div>
  );
}
