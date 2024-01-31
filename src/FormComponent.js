// FormComponent.js
import React, { useRef } from 'react';
import handleSubmit from './handles/handlesubmit';

const FormComponent = ({ isFormVisible, toggleFormVisibility }) => {
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = '';
  };

  return (
    <section>
      {isFormVisible && (
        <form onSubmit={submithandler}>
          <input type="text" ref={dataRef} />
          <button type="submit">Save</button>
        </form>
      )}
      <button onClick={() => toggleFormVisibility(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>
    </section>
  );
};

export default FormComponent;
