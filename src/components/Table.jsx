'use client'
import React from 'react';

const Table = ({ hospitals, onHospitalClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {hospitals.map((hospital) => (
          <tr key={hospital.name}>
            <td>{hospital.name}</td>
            <td>
              <button onClick={() => onHospitalClick(hospital)}>Show on Map</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
