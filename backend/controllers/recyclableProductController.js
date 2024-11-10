import asyncHandler from '../middleware/asyncHandler.js';
import RecyclableProduct from '../models/recyclableProductModel.js';

// @desc Get all recyclable products with pagination and search
// @route GET /api/recyclable-products
// @access Public
const getRecyclableProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // recherche insensible à la casse
        },
      }
    : {};

  const count = await RecyclableProduct.countDocuments({ ...keyword });
  const products = await RecyclableProduct.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Get recyclable product by ID
// @route GET /api/recyclable-products/:id
// @access Public
const getRecyclableProductById = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Produit introuvable');
  }
});

// @desc Create new recyclable product
// @route POST /api/recyclable-products
// @access Private/Admin

// @desc Create a recyclable product with default values
// @route POST /api/recyclable-products
// @access Private/Admin
const createRecyclableProduct = asyncHandler(async (req, res) => {
  // Créer un produit recyclable avec des valeurs par défaut
  const product = new RecyclableProduct({
    name: 'Nom exemple', // Nom par défaut
    brand: 'Marque exemple', // Marque par défaut
    weightGr: 100, // Poids par défaut
    description: 'Description exemple', // Description par défaut
    recyclingNote: 5, // Note de recyclage par défaut
    photo: '/images/sample.png', // Chemin d’image par défaut
    barCode: '0000000000', // Code-barres par défaut
  });

  // Sauvegarder le produit avec les valeurs par défaut
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// const createRecyclableProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     brand,
//     plastic_types,
//     colors,
//     weightGr,
//     description,
//     recyclingNote,
//     photo,
//     barCode,
//   } = req.body;

//   const productExists = await RecyclableProduct.findOne({ name });

//   if (productExists) {
//     res.status(400);
//     throw new Error('Ce produit existe déjà');
//   }

//   const product = await RecyclableProduct.create({
//     name,
//     brand,
//     plastic_types,
//     colors,
//     weightGr,
//     description,
//     recyclingNote,
//     photo,
//     barCode,
//   });

//   res.status(201).json(product);
// });

// @desc Update recyclable product
// @route PUT /api/recyclable-products/:id
// @access Private/Admin
const updateRecyclableProduct = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Produit introuvable');
  }

  const {
    name,
    brand,
    plastic_types,
    colors,
    weightGr,
    description,
    recyclingNote,
    photo,
    barCode,
  } = req.body;

  product.name = name || product.name;
  product.brand = brand || product.brand;
  product.plastic_types = plastic_types || product.plastic_types;
  product.colors = colors || product.colors;
  product.weightGr = weightGr || product.weightGr;
  product.description = description || product.description;
  product.recyclingNote = recyclingNote || product.recyclingNote;
  product.photo = photo || product.photo;
  product.barCode = barCode || product.barCode;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

// @desc Delete recyclable product
// @route DELETE /api/recyclable-products/:id
// @access Private/Admin
const deleteRecyclableProduct = asyncHandler(async (req, res) => {
  const product = await RecyclableProduct.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Produit supprimé' });
  } else {
    res.status(404);
    throw new Error('Produit introuvable');
  }
});

// @desc Get top recyclable products (sorted by a specific criteria)
// @route GET /api/recyclable-products/top
// @access Public
const getTopRecyclableProducts = asyncHandler(async (req, res) => {
  const products = await RecyclableProduct.find({})
    .sort({ recyclingNote: -1 })
    .limit(3);

  res.json(products);
});

export {
  getRecyclableProducts,
  getRecyclableProductById,
  createRecyclableProduct,
  updateRecyclableProduct,
  deleteRecyclableProduct,
  getTopRecyclableProducts,
};
