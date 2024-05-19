import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
});

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [imageSchema],
    description: {
      type: String,
      required: true,
    },
    isWishlist: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBest: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    properties: [{}],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
    ],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    expiryDate: {
      type: Date, // Date type for expiry date
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: function () {
        return this.expiryDate < Date.now(); // Set isExpired based on expiryDate compared to current date
      },
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export default Products;
