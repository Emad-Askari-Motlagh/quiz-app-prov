import React from "react";
import styles from "./Info.module.scss";

export default function Info({ label, children, type }) {
  return (
    <div className={styles.container}>
      <div>{label}</div>
      <div className={styles.error_Parent}>
        <span style={{ color: type === "successed" ? "green" : "red" }}>
          {children}
        </span>
      </div>
    </div>
  );
}
