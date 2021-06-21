import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        reviewCreatorId: {
            type: String
        },
        comment: {
            type: String,
            required: true,
        },
        reviewCreatorName: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const productSchema = mongoose.Schema({
    productCreatorId: {
        type: String
    },
    productName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        default: "60 Capsules"
    },
    directionForUse: {
        type: String,
    },
    benefits: {
        type: [String],
    },
    ingredients: {
        type: String,
    },
    safetyInfo: {
        type: [String],
    },
    reviews: [reviewSchema],
    productImage: {
        type: String
    },
    overallRating: {
        type: Number,
        default: 5.0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;



