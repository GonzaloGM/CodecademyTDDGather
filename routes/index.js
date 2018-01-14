const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const newItem = new Item({title, description, imageUrl});
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', {newItem: newItem});
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.get('/items/:id/update', async(req, res, next) => {
  try {
    const itemToUpdate = await Item.findOne({'_id': req.params.id});

    res.render('update', {'itemToUpdate': itemToUpdate});
  } catch(e) {
    const errorItem = {
      'title': 'Item not found',
      'description': `We're sorry, but the item couldn't be found.`,
      'imageUrl': 'http://via.placeholder.com/150x150'
    }
    res.render('single', {'newItem': errorItem});
  }
});

router.patch('/items/:id/update', async(req, res, next) => {
  try {
    const itemToUpdate = await Item.findOneAndUpdate({'_id': req.params.id}, req.body).exec();
    res.redirect(`/items/${req.params.id}`);
  } catch(e) {
    const errorItem = {
      'title': 'Item not found',
      'description': `We're sorry, but the item couldn't be found.`,
      'imageUrl': 'http://via.placeholder.com/150x150'
    }
    res.render('single', {'newItem': errorItem});
  }
});

router.delete('/items/:id/delete', async(req, res, next) => {
  try {
    const itemToDelete = await Item.findOneAndRemove({'_id': req.params.id}).exec();
    res.redirect(`/`);
  } catch(e) {
    const errorItem = {
      'title': 'Item not found',
      'description': `We're sorry, but the item couldn't be found.`,
      'imageUrl': 'http://via.placeholder.com/150x150'
    }
    res.render('single', {'newItem': errorItem});
  }
});

router.get('/items/:id', async(req, res, next) => {
  try {
    const newItem = await Item.findOne({'_id': req.params.id});
    res.render('single', {'newItem': newItem});
  } catch(e) {
    const errorItem = {
      'title': 'Item not found',
      'description': `We're sorry, but the item couldn't be found.`,
      'imageUrl': 'http://via.placeholder.com/150x150'
    }
    res.render('single', {'newItem': errorItem});
  }
});

module.exports = router;
