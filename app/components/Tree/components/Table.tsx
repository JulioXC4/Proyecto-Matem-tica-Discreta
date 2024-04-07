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
    <div className="flex justify-center items-center bg-gray-400 w-full h-full">
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Left</th>
              <th>Data</th>
              <th>Right</th>
            </tr>
          </thead>
          <tbody>
            {data.map((node, index) => (
              <tr key={index}>
                <td>{node.left !== null ? node.left : "-"}</td>
                <td>{node.data}</td>
                <td>{node.right !== null ? node.right : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos disponibles para la tabla.</p>
      )}
    </div>
  );
};

export default Table;
