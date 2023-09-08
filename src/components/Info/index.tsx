import React, { ReactNode } from "react";
import "./Info.module.scss";

interface InfoProps {
  label?: string;
  children: ReactNode;
  type: "successed" | "error";
}

export default function Info({ label, children, type }: InfoProps) {
  return (
    <div className={"container"}>
      {label && <div>{label}</div>}
      <div className={"error_Parent"}>
        <span style={{ color: type === "successed" ? "green" : "red" }}>
          {children}
        </span>
      </div>
    </div>
  );
}
