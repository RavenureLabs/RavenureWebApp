// src/components/Table.tsx
import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function Table<T extends { id?: string | number }>({ data, columns }: TableProps<T>) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {columns.map((col) => (
              <th key={String(col.key)} className="py-3 px-4 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b last:border-none hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-2 px-4">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
