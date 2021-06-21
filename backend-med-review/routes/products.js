import express from 'express';
import auth from '../middleware/auth.js';

import { getProducts, getProductById, getProductsByName, sortByRating, createProduct, deleteProduct, updateProduct, createReview, updateReview, deleteReview, fliterByCategory} from '../controllers/products.js'

const router = express.Router();

// ADD PRODUCT ROUTES HERE
router.get('/', getProducts);
router.get('/getProductById/:id', getProductById);
router.get('/getProductsByName/:name', getProductsByName);
router.get('/sortByRatings', sortByRating)
router.get('/filterByCategory/:category', fliterByCategory)
router.post('/', auth, createProduct);
router.delete('/:id', auth, deleteProduct);
router.patch('/:id', auth, updateProduct);
router.patch('/createReview/:id', auth, createReview);
router.patch('/updateReview/:reviewId&:productId', auth, updateReview);
router.patch('/deleteReview/:reviewId&:productId', auth, deleteReview);

export default router;