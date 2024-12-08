import React from "react";

export type ButtonProps = {
  children: React.ReactNode | string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
};

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
  error?: string;
  options?: string[];
} & React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>;

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}