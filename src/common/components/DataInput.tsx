import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Input } from ".";

type DataInfoProps = {
  label: string;
  value: string | number | React.ReactNode;
};

export const DataInfo = React.memo(function FnDataInfo({
  label,
  value,
}: DataInfoProps) {
  return (
    <div className="mt-1">
      <label>
        <span className="text-camo-400 mr-4">{label}:</span>
        <span>{value}</span>
      </label>
    </div>
  );
});

type InputDataProps = DataInfoProps & {
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputData = ({
  id,
  className,
  label,
  type,
  value,
  onChange,
}: InputDataProps) => (
  <div className="mt-1">
    <label className="flex items-center">
      <span className="text-primary mr-4">{label}:</span>
      <Input
        className={
          "flex-grow rounded-sm border border-primary bg-transparent" +
          (className ? ` ${className}` : "")
        }
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);
