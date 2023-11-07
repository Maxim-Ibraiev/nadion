import React from "react";
import s from "./HeaderBtn.module.scss";

interface IProps {
  src: string;
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  fill?: string;
  handleClick: () => void;
}

function HederBtn({
  src,
  className = "",
  fill = "#fff",
  ariaLabel,
  children = null,
  handleClick,
}: IProps) {
  return (
    <button
      className={`${s.wrapper} ${className}`}
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
      {src && (
        <span
          style={{ backgroundImage: `url(${src})`, fill }}
          className={s.icon}
        />
      )}
    </button>
  );
}

export default HederBtn;
