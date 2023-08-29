import express from "express";
import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Category from "./../Models/CategoryModel.js";

const categoryRoute = express.Router();

// Recurtion function to generate categories in tree form
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      image: cate.image,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

// Get all categories
categoryRoute.get(
  "/get",
  asyncHandler(async (req, res) => {
    const category = await Category.find({});

    if (category) {
      const categoryList = createCategories(category);
      res.status(200).json({ categoryList });
    }
  })
);

// Get specific categories
categoryRoute.get(
  "/gett",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({
      name: { $in: ["toys", "laptops", "fitness", "pet supllies"] },
    });

    if (categories.length > 0) {
      res.status(200).json({ categories });
    } else {
      res
        .status(404)
        .json({ message: "No categories found with the specified name." });
    }
  })
);

// Create category
categoryRoute.post(
  "/add",
  asyncHandler(async (req, res) => {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
      image: req.body.image,
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    const category = await cat.save();

    res.json(category);
  })
);

// Get category by ID
categoryRoute.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const categories = await Category.find({});
    const category = await Category.findById(id);
    const categoryList = [];
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    for (let cate of [category]) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        image: cate.image,
        children: createCategories(categories, cate._id),
      });
    }

    return res.status(200).json({ categoryList });
  })
);

export default categoryRoute;
