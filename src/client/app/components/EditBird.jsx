import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  useParams
} from "react-router-dom";
import { FIELDS } from '../constants';
import { useHistory } from 'react-router-dom';
import BirdForm from './BirdForm';

export default function EditBird({setIsBackButton}) {
  const [form, setForm] = useState(FIELDS);
  const [isFetching, setIsFetching] = useState(false);

  let id = useParams().birdId;

  const history = useHistory();
  const redirectToMainPage = useCallback(() => history.push('/'), [history]);

  useEffect(async () => {
    setIsBackButton(true);
    fetchBird().then((response) => {
      console.log(response);
    });
  }, []);

  const fetchBird = async function () {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/bird/${id}`);
      const bird = await res.json();

      setIsFetching(false);

      setForm({
        name: bird.name,
        shortDescription: bird.shortDescription,
        description: bird.description,
        quantity: bird.quantity,
        threats: bird.threats,
        localization: bird.localization,
        photo: bird.photo
      });

    } catch (err) {
      console.log(err.message);
    }
  };

  const saveBird = async function () {
    setIsFetching(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      };

      const res = await fetch(`/api/bird/${id}`, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
      const bird = await res.json();

    } catch (err) {
      console.log(err.message);
    }
  };

  function handleFormChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value || '',
      _id: id
    })
  }

  function submit() {
    saveBird().then(() => {
      redirectToMainPage();
    });
  }

  return (
    <BirdForm form={form} handleFormChange={handleFormChange} submit={submit} />
  )
}
