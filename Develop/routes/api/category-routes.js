const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ 
        model: Product,
        required: true
       }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => { // TODO FIX: doesn't work on getting new categories
  try {
    const categoryData = await Category.findByPk(req.params.id, 
      { include: [{ 
        model: Product,
        required: true
       }]}
    );
    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => { // TODO FIX: doesn't update the category information
  // update a category by its `id` value
  try {
    const categoryData = await Category.create({
      where: {
        id: req.params.id
      }
      
    });

    categoryData.name = req.body;

    await categoryData.save();

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
