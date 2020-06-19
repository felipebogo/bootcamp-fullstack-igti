import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import Installments from './components/Installments/Installments';

export default function App() {
  const [hasErrors, setHasErrors] = useState(false);
  const [formData, setformData] = useState(null);

  const handleFormChange = (data) => {
    if(!data){
      setHasErrors(true);
      setformData(null);
      return;
    }
    setHasErrors(false);
    setformData(data);
  }

  useEffect(() => {
    if(!hasErrors && !!formData){
      console.log('faz busca',formData);
    }

  }, [formData, hasErrors])

  const { initialValue, interests, months } = formData || {};
  
  return (
    <div className="container center">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h1>React - Juros Compostos</h1>
            <hr />
            <Form initialValueInput={5900}
              interestsInput={0.8}
              monthsInput={10}
              onFormChange={handleFormChange} />
            {!hasErrors && <Installments initialValue={initialValue} interests={interests}  months={months}  />}
          </div>
        </div>
      </div>
    </div>
  );
}
