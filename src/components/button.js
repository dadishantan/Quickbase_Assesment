import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component }  from 'react';

// export default function _save() {
//     return (
        
//             <button id='save' className='btn btn-success'>Save Changes</button>
            
//     )
// }



import { useState } from 'react';

function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500); // simulate a 2 second delay before resetting the loading state
  };

  return (
    <button className={`btn btn-success ${loading ? 'loading' : ''}`} onClick={handleClick}>
      {loading ? 'Loading...' : 'Save Changes'}
    </button>
  );
}

export default SubmitButton;
