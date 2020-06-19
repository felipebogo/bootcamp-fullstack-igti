import React, { useState, useEffect, useCallback } from 'react'
import css from './form.module.css';

const INITIAL_VALUE = {
  min: 1,
  max: 100000,
  step: 1
}
const INTERESTS = {
  min: -12,
  max: 12,
  step: 0.1
}
const MONTHS = {
  min: 1,
  max: 36,
  step: 1
}

export default function Form(
  { initialValueInput,
    interestsInput,
    monthsInput,
    onFormChange }) {

  const [initialValue, setInitialValue] = useState(initialValueInput || '');
  const [interests, setInterests] = useState(interestsInput || '');
  const [months, setMonths] = useState(monthsInput || '');
  const [errors, setErrors] = useState([]);

  const validateFields = useCallback(
    () => {
      const newErrors = [];
      if (initialValue < INITIAL_VALUE.min || initialValue > INITIAL_VALUE.max) {
        newErrors.push(`Montante inicial fora da faixa de valores válidos ${INITIAL_VALUE.min} a ${INITIAL_VALUE.max}.`);
      }
      if (interests < INTERESTS.min || interests > INTERESTS.max) {
        newErrors.push(`Taxa de juros fora da faixa de valores válidos ${INTERESTS.min} a ${INTERESTS.max}.`);
      }
      if (months < MONTHS.min || months > MONTHS.max) {
        newErrors.push(`Período fora da faixa de valores válidos ${MONTHS.min} a ${MONTHS.max}.`);
      }
      setErrors(newErrors);
    },
    [initialValue, interests, months]
  );

  const formFields = useCallback(
    () => {
      return (errors.length === 0 ? { initialValue, interests, months } : null);
    },
    [errors, initialValue, interests, months]);

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  useEffect(() => {
    onFormChange(formFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleInitialValueChange = (event) => {
    const { value } = event.target;
    setInitialValue(value);
  }
  const handleInterestsChange = (event) => {
    const { value } = event.target;
    setInterests(value);
  }
  const handleMonthsChange = (event) => {
    const { value } = event.target;
    setMonths(value);
  }

  const styleInput = `input-field ${css.flexCol}`;

  return (
    <div >

      <div className={css.flexRow}>
        <div className={styleInput}>
          <label className="active" htmlFor="inputInitialValue">Montante Inicial:</label>
          <input
            onChange={handleInitialValueChange}
            id="inputInitialValue"
            type="number"
            min={INITIAL_VALUE.min}
            max={INITIAL_VALUE.max}
            step={INITIAL_VALUE.step}
            value={initialValue}
            autoFocus />
        </div>
        <div className={styleInput}>
          <label className="active" htmlFor="inputInterests">Taxa de Juros Mensal:</label>
          <input
            onChange={handleInterestsChange}
            id="inputInterests"
            type="number"
            min={INTERESTS.min}
            max={INTERESTS.max}
            step={INTERESTS.step}
            value={interests} />
        </div>
        <div className={styleInput}>
          <label className="active" htmlFor="inputMonths">Período (meses):</label>
          <input
            onChange={handleMonthsChange}
            id="inputMonths"
            type="number"
            min={MONTHS.min}
            max={MONTHS.max}
            step={MONTHS.step}
            value={months}
          />
        </div>
      </div>
      {
        errors.length > 0 &&
        <div className={`card horizontal ${css.errors}`}>
          <div className="card-stacked">
            <div className="card-content left-align">
              {errors.map(error => {
                return (
                  <p key={error} className={css.fieldError}>{error}</p>
                )
              })}
            </div>
          </div>
        </div>

      }
    </div>


  )
}