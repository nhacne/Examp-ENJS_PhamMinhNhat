const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ productDate: -1 });
    
    res.render('index', {
      pageTitle: 'Products',
      products: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error when select data!');
  }
};

exports.addProduct = async (req, res) => {
  const newProductName = req.body.productName; 
  const newProductCode = req.body.productCode; 
  const newProductStoreCode = req.body.productStoreCode; 

  if (!newProductName) {
    return res.redirect('/');
  }

  const newProduct = new Product({  
    productName: newProductName,
    productCode: newProductCode,
    productStoreCode: newProductStoreCode
  });

  try {
    await newProduct.save();
    console.log(`Added: ${newProductName}, ${newProductCode}, ${newProductStoreCode}`);
    res.redirect('/');
  } catch (err) {
    console.error('Error add:', err);
    res.status(500).send('Error when add in DB');
  }
};

exports.getEditProduct= async (req, res) => {
  const productId = req.params.id; 

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.redirect('/'); 
    }
    
    res.render('edit', {
      pageTitle: 'Edit',
      product: product
    });
  } catch (err) {
    console.error('Error when edit:', err);
    res.status(500).send('Error sever!');
  }
};

exports.postEditProduct = async (req, res) => {
  const productId = req.body.productId;

  const updateCode = req.body.productCode;
  const updatedName = req.body.productName;
  const updatedQuantity = req.body.productQuantity;
  const updateOriginPrice = req.body.productOriginPrice;
  const updateStoreCode = req.body.productStoreCode;

  try {
    const product = await Product.findById(productId);
    
    if (!product) {
        return res.redirect('/');
    }

    product.productCode = updateCode;
    product.productName = updatedName;
    product.quantity = updatedQuantity;
    product.productOriginPrice = updateOriginPrice;
    product.productStoreCode = updateStoreCode;
    
    await product.save(); 
    
    console.log(`Updated ID: ${productId}`);
    res.redirect('/'); 
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error DB');
  }
};

exports.deleteProduct= async (req, res) => {
  const productId = req.body.productId;

  try {
    await Product.findByIdAndDelete(productId);
    console.log(`Deleted ID: ${productId}`);
    res.redirect('/');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error DB');
  }
};