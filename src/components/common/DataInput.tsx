import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/common/Input";

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
  name?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputData = ({
  id,
  name,
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
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

type OptionProps = {
  label: string;
  value: string;
};

type SelectDataProps = Omit<InputDataProps, "onChange"> & {
  options: OptionProps[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectData = ({
  id,
  name,
  className,
  label,
  value,
  options,
  onChange,
}: SelectDataProps) => (
  <div className="mt-1">
    <label className="flex items-center">
      <span className="text-primary mr-4">{label}:</span>
      <select
        id={id}
        name={name ?? id}
        className={
          "flex-grow rounded-sm border border-primary bg-transparent" +
          (className ? ` ${className}` : "")
        }
        onChange={onChange}
        value={value ?? ""}
      >
        <option value="">{`Select ${label}..`}</option>
        {options.map((option: OptionProps, idx: number) => (
          <option
            key={idx}
            value={option.value}
            // selected={value == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);
