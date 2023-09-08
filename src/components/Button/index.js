import React from "react";
import "./Button.scss";

export default function Button({ label, width }) {
  return (
    <button style={{ width }} className="button-wrapper">
      {label}
    </button>
  );
}
