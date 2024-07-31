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
        required: true,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
       }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { 
  try {
    const categoryData = await Category.findByPk(req.params.id, 
      { include: [{ 
        model: Product,
        required: true,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
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

router.put('/:id', async (req, res) => { 
  try {
    
    const categoryData = await Category.findByPk(req.params.id);
    console.log(categoryData);

    categoryData.category_name = req.body.category_name; 
    await categoryData.save();

    if (!categoryData) {
      res.status(404).json({ message: 'Category was not found with id given.' })
      return;
    }

    res.status(200).json({message: 'Category was successfully updated'});

  } catch (err) {
    res.status(500).json(err);
  }
});

// route to delete categories 
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

    res.status(200).json({message: 'Category was successfully deleted.'});

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
