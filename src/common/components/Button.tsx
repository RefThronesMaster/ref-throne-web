import { CSSProperties } from "react";
import { Color } from ".";

type ButtonProps = {
  text: string;
  className?: string;
  color?: Color;
  style?: CSSProperties;
  onClick?: () => void;
};

export const Button = ({
  text,
  color,
  className,
  onClick,
  style,
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
        "rounded-sm p-1 px-4" +
        (colorSet ? ` ${colorSet}` : "") +
        (className ? ` ${className}` : "")
      }
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
