import React from 'react';

const DeleteWarning = ({ warning, setWarning }) => {
  let warningStyle = {
    display: warning ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'relative',
    border: '0.5px solid lightgrey',
    borderRadius: '8px',
    padding: '1em',
    width: '50%',
    minWidth: '300px',
    background: 'white',
    margin: '1em auto',
  };
  return (
    <div style={warningStyle}>
      Are you suer you want to delete this product ?
      <div>
        <button className="btn btn-danger mr-2" onClick={() => deleteItem()}>
          Yes
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setWarning(!warning)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWarning;
