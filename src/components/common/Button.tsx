import React, { CSSProperties } from "react";
import { Color } from "@/components/types";

type ButtonProps = {
  children: string | number | React.ReactNode;
  className?: string;
  color?: Color;
  style?: CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  color,
  className,
  onClick,
  style,
  disabled,
}: ButtonProps) => {
  let colorSet = "";
  switch (color) {
    case "primary":
      colorSet = "text-black bg-primary";
      break;
    case "secondary":
      colorSet = "text-black bg-secondary";
      break;
    case "text":
      if (!className?.includes("text-")) colorSet = "text-white";
      break;
    default:
      break;
  }

  return (
    <button
      type="button"
      className={
        "inline-flex justify-center items-center" +
        (disabled ? " disabled:text-gray-400 disabled:cursor-not-allowed" : "") +
        (colorSet ? ` ${colorSet}` : "") +
        (className ? ` ${className}` : "")
      }
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
