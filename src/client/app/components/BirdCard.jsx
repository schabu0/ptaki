import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useHistory } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function BirdCard({ bird, description, onRemove }) {
  const classes = useStyles();

  const history = useHistory();
  const redirectToEdit = useCallback(() => history.push('/edit/' + bird._id), [history]);

  const removeBird = async function () {
    try {
      await fetch(`/api/remove/${bird._id}`);

      onRemove(bird._id);

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {bird.quantity}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={redirectToEdit}>
            <EditIcon/>
          </IconButton>
        }
        title={
          <Link to={'/bird/' + bird._id}>{bird.name}</Link>}
        subheader={bird.shortDescription}
      />
      {bird.photo && <CardMedia
        className={classes.media}
        image={bird.photo}
        title={bird.name}
      />}
      {description && <CardContent>
        <Typography variant="h6" className={'mt-2'} color="textSecondary" component="p">
          Miejsce
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {bird.localization}
        </Typography>
        <Typography variant="h6" className={'mt-2'} color="textSecondary" component="p">
          Opis
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {bird.description}
        </Typography>
        <Typography variant="h6" className={'mt-2'} color="textSecondary" component="p">
          Zagrożenia
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {bird.threats}
        </Typography>
      </CardContent>}
      <CardActions disableSpacing>
        <IconButton aria-label="Usuń" onClick={removeBird}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
