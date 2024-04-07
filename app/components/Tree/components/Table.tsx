import React from "react";
interface NodeTable {
  left: number | null;
  data: number;
  right: number | null;
}

interface TableProps {
  data: NodeTable[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="flex justify-center items-center bg-gray-400 w-full h-full overflow-y-auto">
      <div className="overflow-y-auto h-full">
        {data && data.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Right
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((node, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {node.left !== null ? node.left : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{node.data}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {node.right !== null ? node.right : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className=" text-gray-500">
            No hay datos disponibles para la tabla.
          </p>
        )}
      </div>
    </div>
  );
};

export default Table;
