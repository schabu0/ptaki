import React, { useEffect } from 'react';
import BirdCard from './BirdCard';
import Grid from '@material-ui/core/Grid';

export default function Home({setIsBackButton, fetch, birds, onBirdRemove }) {
  useEffect(async () => {
    setIsBackButton(false);
    fetch()
      .then((response) => {
        console.log(response);
      });
  }, []);
  return (
    <Grid container spacing={2} className="my-4">
        {birds.map((bird) => (
          <Grid key={bird._id} className={'justify-content-center d-flex'} item xs={12} lg={6}>
            <BirdCard bird={bird} onRemove={onBirdRemove}></BirdCard>
          </Grid>
        ))}
    </Grid>
  );
}
