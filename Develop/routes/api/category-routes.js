const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Location.findAll({
      include: [{ model: Product, as: 'Products' }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Location.findByPk(req.params.id);

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Location.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Location.update({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json(categoryData);

  } catch (error) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Location.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json(categoryData);

  } catch (error) {
    res.status(500).json(err);
  }

});

module.exports = router;
