import React from 'react'
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
        <div>
          <h2>Tabla de Nodos</h2>
          <table>
            <thead>
              <tr>
                <th>Left</th>
                <th>Data</th>
                <th>Right</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((node, index) => (
                <tr key={index}>
                  <td>{node.left !== null ? node.left : '-'}</td>
                  <td>{node.data}</td>
                  <td>{node.right !== null ? node.right : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Table