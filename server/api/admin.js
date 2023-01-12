const router = require("express").Router();
const { Product, User } = require('../db');

// GET /api/admin/products
router.get('/admin/products', async (req, res, next) => {
  try{
    res.send(await Product.findAll());
  } catch (error) {
    next (error)
  }
});

// view all users
// GET /api/admin/users
router.get('/admin/users', async(req, res, next) => {
  try{
    res.send(await User.findAll());
  } catch (error){
    next(error)
  }
});

// add a new product
// POST /api/admin/products
router.post('/admin/products', async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (error) {
    next(error)
  }
});

// delete an existing product
// DELETE /api/admin/products/:productId
router.delete('/admin/products/:productId', async (req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error){
    next(error);
  }
});

// edit an existing product
// PUT /api/admin/products/:productId
router.put("/admin/products/:productId", async(req, res, next) => {
  try{
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch(error) {
    next(error);
  }
});


module.exports = router;