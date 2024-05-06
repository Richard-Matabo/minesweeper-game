// BoardCell.js
import React from 'react';

const BoardCell = ({ cellData, onClick }) => {
  const { row, col, revealed, mine, neighborMines } = cellData;
  const cellStyle = {
    backgroundColor: revealed ? '#ddd' : '#999',
    color: revealed && mine ? 'red' : 'black',
  };

  return (
    <div className="cell" style={cellStyle} onClick={() => onClick(row, col)}>
      {revealed ? (mine ? '💣' : neighborMines) : ''}
    </div>
  );
};

export default BoardCell;
