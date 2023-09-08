import React from "react";
import "./Button.scss";

export default function Button({
  label,
  width,
}: {
  label: string;
  width: string;
  type?: string;
}) {
  return (
    <button style={{ width }} className="button-wrapper">
      {label}
    </button>
  );
}
