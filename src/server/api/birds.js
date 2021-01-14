/* eslint-disable prefer-arrow-callback, no-magic-numbers */
import app from '../app';
import Bird from '../models/bird';

app.get('/api/bird/:birdId', async function (req, res) {
  const { birdId } = req.params;

  try {
    const bird = await Bird.findById(birdId);

    res.status(200).send(bird);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/birds', async function (req, res) {
  try {
    const birds = await Bird.find();

    res.status(200).send(birds);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/remove/:birdId', async function (req, res) {
  const { birdId } = req.params;

  try {
    await Bird.deleteOne({_id: birdId});

    res.status(200).send({});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/birds', async function (req, res) {
  const {
    name,
    shortDescription,
    description,
    quantity,
    threats,
    localization,
    photo
  } = req.body;

  try {
    await Bird.create({
      name,
      shortDescription,
      description,
      quantity,
      threats,
      localization,
      photo
    });

    res.sendStatus(200).send({});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/api/bird/:birdId', async function (req, res) {
  const {
    name,
    shortDescription,
    description,
    quantity,
    threats,
    localization,
    photo,
    _id
  } = req.body;

  try {
    await Bird.update({_id}, {$set: {
        name,
        shortDescription,
        description,
        quantity,
        threats,
        localization,
        photo,
      }}, {upsert: true}, function(err){
      console.log(err);
    });

    res.sendStatus(200).send({});
  } catch (err) {
    res.status(500).send(err.message);
  }
});
