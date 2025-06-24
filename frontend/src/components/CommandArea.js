
import React, { useState } from 'react';

const CommandArea = () => {
  const [sqlCommand, setSqlCommand] = useState('');
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setColumns([]);
    setRows([]);

    try {
      const res = await fetch('http://localhost:5000/execute-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlCommand }),
      });

      const data = await res.json();
      if (data.status === 'success') {
        setColumns(data.columns);
        setRows(data.rows);
      } else {
        setError(data.message || 'Unknown error occurred.');
      }
    } catch (err) {
      setError('Could not connect to backend.');
    }
  };

  return (
    <div
      style={{
        width: '75%',
        margin: '40px auto',
        background: 'linear-gradient(90deg, #007bff, #0056b3)',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 5s ease infinite',
        borderRadius: '8px',
        padding: '20px 30px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        position: 'relative',
        color: 'white',
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <label
        style={{
          fontSize: '1.1rem',
          fontWeight: '500',
          marginBottom: '10px',
          display: 'block',
        }}
      >
        Write the statement
      </label>

      <textarea
        value={sqlCommand}
        onChange={(e) => setSqlCommand(e.target.value)}
        style={{
          width: '100%',
          height: '150px',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          resize: 'vertical',
          boxSizing: 'border-box',
          marginBottom: '40px',
          background: 'linear-gradient(90deg, #e6f0ff, #d0e0ff)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 5s ease infinite',
          color: 'black',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#006400', // dark green
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Submit
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: '20px',
            color: '#ffcccc',
            fontWeight: '500',
          }}
        >
          {error}
        </div>
      )}

      {columns.length > 0 && (
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#e6f0ff',
            padding: '15px',
            borderRadius: '6px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            color: 'black',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    style={{
                      borderBottom: '1px solid #ccc',
                      padding: '8px',
                      textAlign: 'left',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {row.map((val, i) => (
                    <td
                      key={i}
                      style={{
                        padding: '8px',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommandArea;
