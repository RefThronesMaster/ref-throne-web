"use client";

import React, { ReactNode } from "react";
import { Button, SortIcon } from ".";

export type SORT = {
  field: string;
  order: "ASC" | "DESC";
};

export type DataRowProps = {
  field: string;
  displayName?: string;
  width?: number | string;
  sortable?: boolean;
  value: (
    record: any,
    field?: string,
    fieldValue?: any
  ) => ReactNode | string | number;
};

export type DataTableProps = {
  className?: string;
  columns?: DataRowProps[];
  data: any[];
  sort?: SORT;
  onChangeSort?: (fieldName: string) => void;
};

export const DataTable = React.memo(function FnDataTable({
  className,
  columns,
  data,
  sort,
  onChangeSort,
}: DataTableProps) {
  return (
    <div className="flex w-full flex-wrap items-end justify-between mt-4 overflow-x-scroll">
      <table className="min-w-[1248px]" cellPadding={0} cellSpacing={0}>
        <colgroup>
          {columns?.map((column, idx) => (
            <col key={idx} width={column.width} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns?.map((column, idx) => (
              <th
                key={idx}
                className="text-sm chakra-petch-regular py-4 px-2 bg-camo-700"
              >
                <div className="flex items-center">
                  <span>{column.displayName}</span>
                  {column.sortable && (
                    <Button
                      onClick={() => onChangeSort && onChangeSort(column.field)}
                    >
                      <SortIcon
                        className="fill-white"
                        order={
                          sort?.field == column.field ? sort.order : undefined
                        }
                      />
                    </Button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns?.map((column, colIdx) => (
                <td
                  key={colIdx}
                  className="text-sm chakra-petch-bold py-4 px-2 bg-camo-700 border-y-[14px] border-y-black"
                >
                  {column.value(row, column.field, row[column.field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
