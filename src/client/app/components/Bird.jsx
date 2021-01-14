import React, { useCallback, useEffect, useState } from 'react';
import {
  useParams,
  useHistory
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import BirdCard from './BirdCard';

export default function Bird({setIsBackButton, onBirdRemove}) {
  const [bird, setBird] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  let id = useParams().id;

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

      setBird({
        name: bird.name,
        shortDescription: bird.shortDescription,
        description: bird.description,
        quantity: bird.quantity,
        threats: bird.threats,
        localization: bird.localization,
        photo: bird.photo,
        _id: id
      });

    } catch (err) {
      console.log(err.message);
    }
  };

  const history = useHistory();
  const redirectToMainPage = useCallback(() => history.push('/'), [history]);

  const onRemove = () => {
    onBirdRemove(bird._id);
    redirectToMainPage();
  };

  return (
    <Grid container spacing={0} className="my-4">
      <Grid className={'justify-content-center d-flex'} item xs={12}>
        {bird && <BirdCard bird={bird} description={true} onRemove={onRemove}></BirdCard>}
      </Grid>
    </Grid>
  );
}
