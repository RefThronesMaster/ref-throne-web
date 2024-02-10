import React, { CSSProperties, ChangeEvent } from "react";
import { Color, SearchIcon } from ".";

type InputProps = {
  text?: string;
  className?: string;
  color?: Color;
  style?: CSSProperties;
  onClick?: () => void;
};

export const Input = ({
  text,
  color,
  className,
  onClick,
  style,
}: InputProps) => {
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

type SerachProps = {
  id: string;
  className?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({ id, className, onChange, style }: SerachProps) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  return (
    <div
      className={
        "flex border rounded-sm items-center" +
        (className ? ` ${className}` : "") +
        (focused ? " border-[#e4e4e4]" : " border-[#7b7b7b]")
      }
    >
      <label htmlFor={id}>
        <SearchIcon className="w-8 h-8 fill-white" />
      </label>
      <input
        id={id}
        className={"bg-transparent w-full p-1 px-4"}
        style={style}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
      ></input>
    </div>
  );
};
