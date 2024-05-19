import express from "express";
import asyncHandler from "express-async-handler";
import Category from "../Models/CategoryModel.js";
import Products from "./../Models/ProductModel.js";
import User from "./../Models/UserModel.js";
import protect from "./../Middleware/AuthMiddleware.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import cron from "node-cron";

const productRoute = express.Router();

// Your OAuth2 credentials
const CLIENT_ID =
  "1038403814667-bd49f38p7fcs2alpf4md3ct93oj6mbb5.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04rjn1A8dcfttCgYIARAAGAQSNwF-L9IrqJP4Of7tUVRcAS2LvgE2KGctAqKltNHf3QXaEM94Q4Tx7EGCHYr74yF-IYeI3_v_o-M";

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const { tokens } = await oAuth2Client.refreshToken(REFRESH_TOKEN);
    oAuth2Client.setCredentials(tokens);
    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token.");
  }
};

// Function to check token expiration and refresh if necessary
const checkAndRefreshToken = async () => {
  try {
    const accessToken = oAuth2Client.getAccessToken();
    const expiryDate = oAuth2Client.credentials.expiry_date;
    const currentTime = new Date().getTime();

    // Refresh token if it's close to expiry or has already expired
    if (!accessToken || (expiryDate && currentTime >= expiryDate - 60000)) {
      await refreshAccessToken();
    }
  } catch (error) {
    console.error("Error checking or refreshing token:", error);
    throw new Error("Failed to check or refresh token.");
  }
};

// Function to set OAuth2 credentials with token refresh logic
const setOAuthCredentials = async () => {
  try {
    await oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });
    console.log("OAuth credentials set successfully.");
  } catch (error) {
    console.error("Error setting OAuth credentials:", error);
    throw new Error("Failed to set OAuth credentials.");
  }
};
// Function to send email
const sendEmail = async (product, subject, text) => {
  try {
    await setOAuthCredentials(); // Ensure OAuth credentials are set before sending emails

    await checkAndRefreshToken(); // Check and refresh token if needed

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "davidodimayo7@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "davidodimayo7@gmail.com",
      to: "idowuodimayo@gmail.com",
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    console.log(`Email sent for ${product.name}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

// Function to check and send email notifications for products nearing expiry
const checkExpiryAndSendEmails = async () => {
  const products = await Products.find({ expiryDate: { $gte: new Date() } });

  products.forEach((product) => {
    const timeDifference = product.expiryDate - Date.now();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 14 || daysDifference === 7 || daysDifference === 1) {
      sendEmail(
        product,
        "Product Expiry Alert",
        `Product ${product.name} is expiring in ${daysDifference} days.`
      );
    } else if (daysDifference === 0) {
      sendEmailNotification(
        product,
        "Product Expired",
        `Product ${product.name} has expired.`
      );
    }
  });
};

// Schedule cron job to run every day
cron.schedule("20 15 * * *", async () => {
  try {
    await checkExpiryAndSendEmails();
    console.log("Scheduled task executed successfully.");
  } catch (error) {
    console.error("Error executing scheduled task:", error);
  }
});

productRoute.get("/check-expiry", async (req, res) => {
  try {
    await checkExpiryAndSendEmails();
    res
      .status(200)
      .send("Expiry check and email notifications sent successfully.");
  } catch (error) {
    console.error(
      "Error checking expiry and sending email notifications:",
      error
    );
    res.status(500).send("Internal server error");
  }
});
// Get all products
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields", "keyword"]; // Add 'search' to excludeFields
      excludeFields.forEach((el) => delete queryObj[el]);
      console.log(queryObj);

      // Add search query functionality
      if (req.query.keyword) {
        const searchField = req.query.keyword;
        queryObj.$or = [
          { position: { $regex: searchField, $options: "i" } }, // Replace 'field1' with the appropriate field to search in
          { company: { $regex: searchField, $options: "i" } },
          { location: { $regex: searchField, $options: "i" } }, // Replace 'field2' with the appropriate field to search in
          // Add more fields to search in, if needed
        ];
      }

      // Create count query object
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));
      let query = Products.find(JSON.parse(queryStr)).populate("category");

      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query.sort("createdAt");
      }

      // Count documents
      const countQueryObj = JSON.parse(queryStr);
      const countQuery = { ...countQueryObj };
      const countDoc = await Products.countDocuments(countQuery);

      // Pagination
      const page = Number(req.query.page) || 1;
      const limit = 12;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        if (skip >= countDoc) throw new Error("This page does not exist");
      }

      const products = await query;
      res.json({ products, page, pages: Math.ceil(countDoc / limit) });
    } catch (error) {
      throw new Error(error);
    }
  })
);

// Featured Products
productRoute.get(
  "/featured",
  asyncHandler(async (req, res) => {
    try {
      const products = await Products.find({ isFeatured: true });
      res.json(products);
    } catch (error) {
      throw new Error(error);
    }
  })
);
//   Get related products
productRoute.get("/related", async (req, res) => {
  try {
    const categoryId = req.query.catId;
    const relatedProducts = await Products.find({
      category: categoryId,
    }).populate("category");
    console.log(relatedProducts);
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Best seller products
productRoute.get(
  "/best",
  asyncHandler(async (req, res) => {
    try {
      const products = await Products.find({ isBest: true }).sort({
        createdAt: "desc",
      });
      res.json(products);
    } catch (error) {
      throw new Error(error);
    }
  })
);

// Single products
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// wishlist
productRoute.put(
  "/wishlist",
  protect,
  asyncHandler(async (req, res) => {
    const { proId } = req.body;
    const user = await User.findById(req.user._id);
    try {
      if (user) {
        const alreadyAdded = user.wishlist.find(
          (wish) => wish.toString() === proId
        );
        if (alreadyAdded) {
          const user = await User.findByIdAndUpdate(
            req.user._id,
            {
              $pull: { wishlist: proId },
              isWishlist: false,
            },
            { new: true }
          );

          res.json(user);
        } else {
          const user = await User.findByIdAndUpdate(
            req.user._id,
            {
              $push: { wishlist: proId },
              isWishlist: true,
            },
            { new: true }
          );

          res.json(user);
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  })
);

// Product review
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Products.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user?.toString() === req.user?._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Product reviwed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
export default productRoute;
