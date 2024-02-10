import { CSSProperties } from "react";
import { Color } from ".";

type ButtonProps = {
  text: string;
  className?: string;
  color?: Color;
  style?: CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  text,
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
      className={
        "rounded-sm" +
        (colorSet ? ` ${colorSet}` : "") +
        (className ? ` ${className}` : "")
      }
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
