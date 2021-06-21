import mongoose from 'mongoose';
import Product from '../models/products.js';
import User from '../models/users.js';

// PRODUCT CONTROLLER

// GET PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// GET PRODUCTS BY ID
export const getProductById = async (req, res) => {
    var id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No product with id: ${id}`);
    var product = await Product.findById(id);
    return res.status(200).json(product)
}

// GET PRODUCTS BY NAME
export const getProductsByName = async (req, res) => {
    var name = req.params.name
    var products = await Product.find({ "productName": new RegExp(name, 'i') }).exec()
    if (products.length == 0)
        return res.status(200).send("No matching products")
    else
        return res.status(200).json(products)
}

// SORT PRODUCTS BY RATING (ASC)
export const sortByRating = async (req, res) => {
    var products = await Product.find().sort({ "overallRating": -1 })
    return res.status(200).json(products)
}

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    const product = req.body;

    const userId = req.userId;
    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    if (user.isAdmin === false) {
        return res.json({ message: 'You are not an admin!!' });
    }

    const newProduct = new Product({
        ...product, productCreatorId: userId, createdAt: new Date().toISOString()
    });

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    if (user.isAdmin === false) {
        return res.json({ message: 'You are not an admin!!' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await Product.findByIdAndDelete(id);

    res.json({ message: 'Product deleted successfully' });
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    if (user.isAdmin === false) {
        return res.json({ message: 'You are not an admin!!' });
    }

    const { productName, companyName, price, category,
        productDetails, quantity, directionForUse, benefits, ingredients, safetyInfo,
        productImage } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = {
        productName, companyName, price, category,
        productDetails, quantity, directionForUse, benefits, ingredients, safetyInfo,
        productImage, _id: id
    };

    await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
};

// CREATE REVIEW
export const createReview = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }

    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const product = await Product.findById(id);

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);

    const user = await User.findById(userId);

    const review = {
        rating: rating,
        comment: comment,
        reviewCreatorId: req.userId,
        reviewCreatorName: user.firstName
    };

    const index = product.reviews.findIndex((object) => object.reviewCreatorId === String(userId));

    if (index === -1) {
        // review the product
        product.reviews.push(review);
    } else {
        // give error
        res.json({ message: 'Product already reviewed' });
    }

    if (product.reviews.length == 1) {
        product.overallRating = rating;
    } else {
        var prevOverallRatingSum = product.overallRating * (product.reviews.length - 1);
        var newOverallRating = (prevOverallRatingSum + rating) / product.reviews.length;
        newOverallRating = Math.round(newOverallRating * 10) / 10;
        product.overallRating = newOverallRating;
    }

    await Product.findByIdAndUpdate(id, product, { new: true });

    res.json(product);

}

// UPDATE REVIEW
export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { productId } = req.params;
    const userId = req.userId;
    // console.log(reviewId, productId, userId);

    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }

    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(404).send(`No product with id: ${productId}`);
    const product = await Product.findById(productId);

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    // const review = product.reviews.find(review => review._id == reviewId);

    var review = product.reviews.find(x => x._id == reviewId);
    if (review.reviewCreatorId == userId) {
        review = {
            _id: reviewId
        }
        product.reviews.pull(review);
        review = {
            rating: rating,
            comment: comment,
            reviewCreatorId: req.userId,
            reviewCreatorName: user.firstName
        };
        product.reviews.push(review);
        await Product.findByIdAndUpdate(productId, product, { new: true });
        res.json({ message: `Updated product review with the id : ${reviewId}` });
    } else {
        res.json({ message: 'You are not the creator of this review' });
    }
}

// DELETE REVIEW
export const deleteReview = async (req, res) => {
    console.log("inside");
    const { reviewId } = req.params;
    const { productId } = req.params;
    const userId = req.userId;
    // console.log(reviewId, productId, userId);

    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(404).send(`No product with id: ${productId}`);
    const product = await Product.findById(productId);

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);

    const review = product.reviews.find(x => x._id == reviewId);
    if (review.reviewCreatorId == userId) {
        const review = {
            _id: reviewId
        }
        product.reviews.pull(review);
        await Product.findByIdAndUpdate(productId, product, { new: true });
        res.json({ message: `Deleted product review with the id : ${reviewId}` });
    } else {
        res.json({ message: 'You are not the creator of this review' });
    }
}

//Fliter products By Category
export const fliterByCategory = async (req, res) => {
    const category = req.params.category;
    const Products = await Product.find({ "category": new RegExp(category, 'i') })

    if (Products.length == 0)
        res.json({ message: "No products available in this category" })
    else
        res.json(Products)
}