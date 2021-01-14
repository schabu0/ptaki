import React, { useCallback, useEffect, useState } from 'react';
import { FIELDS } from '../constants';
import { useHistory } from 'react-router-dom';
import BirdForm from './BirdForm';

export default function AddBird({setIsBackButton, onSubmit}) {
  const [form, setForm] = useState(FIELDS);

  useEffect(async () => {
    setIsBackButton(true);
  }, []);

  function handleFormChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const history = useHistory();
  const redirectToMainPage = useCallback(() => history.push('/'), [history]);

  function submit() {
    console.log(form);
    onSubmit(form);
    redirectToMainPage();
  }

  return (
    <BirdForm form={form} handleFormChange={handleFormChange} submit={submit} />
  )
}
