type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
}


type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}

const Table = <T,>({ data, columns, actions }: TableProps<T>): JSX.Element => {
  return (
    <table className="table-auto w-full mt-6 border-collapse border border-gray-200">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="border px-4 py-2 bg-gray-100 text-left font-semibold"
            >
              {column.header}
            </th>
          ))}
          {actions && (
            <th className="border px-4 py-2 bg-gray-100 text-left font-semibold">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border px-4 py-2">
                {column.accessor(row)}
              </td>
            ))}
            {actions && (
              <td className="border px-4 py-2">{actions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;