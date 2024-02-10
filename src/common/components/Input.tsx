import React, {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
} from "react";
import { SearchIcon } from ".";

type InputProps = {
  id?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  step?: string | number;
  readOnly?: boolean;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  id,
  type,
  className,
  placeholder,
  onChange,
  step,
  readOnly,
  style,
  value,
}: InputProps) => {
  return (
    <input
      id={id}
      type={type}
      className={className}
      placeholder={placeholder}
      style={style}
      step={step}
      readOnly={readOnly}
      onChange={onChange}
      value={value ?? 0}
    />
  );
};

// export const MemoizedInput = React.memo(Input);

type SearchProps = {
  id: string;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({
  id,
  className,
  placeholder,
  onChange,
  style,
}: SearchProps) => {
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
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
