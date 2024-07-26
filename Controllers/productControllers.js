const { model, default: mongoose } = require("mongoose");

const Product = require("../models/productsModel")

//get all 
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  if (products == 0 || products === null) {
    res.status(404).json({ error: "No such product" });
  }
  else {res.status(200).json(products);}  
  
  
};

//get a single 
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await product.findById(id);

  if (!Product) {
    res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

//create new product
const createProduct = async (req, res) => {
  const { name, image, initialPrice, newPrice,description, tag } = req.body;

  //check for emtpy fields
  let emptyField = []

  if(!name){
    emptyField.push('name')
  }

  if(!image){
    emptyField.push('image')
  }
  
  if(!initialPrice){
    emptyField.push('initialPrice')
  }
  if(!tag){
    emptyField.push('tag')
  }

  if (emptyField.length > 0) {
    return res.status(400).json({error: 'Please fill in all fields', emptyField })
  }

  //add doc to db
  try {
    // Check if a workout with the same title already exists
    // const existingWorkout = await Workout.findOne({ title });
    // if (existingWorkout) {
    //   return res
    //     .status(400)
    //     .json({ error: "A workout with this title already exists." });
    // }

    //Add new workout
    const product = await Product.create({ name, image, initialPrice, newPrice,description, tag });
    // res.status(201).json({ message: "User added successfully" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message, emptyField });
  }
};

//delete 
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findByIdAndDelete({ _id: id });

  if (!Product) {
    res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

//update all
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  //update the product existing product
  const product = await Product.findByIdAndUpdate({ _id: id }, {...req.body});

  //check if product is null
  if (!Product) {
    res.status(400).json({ error: "No such product" });
  }

  res.status(200).json(product);

};

//PATCH update only price
const updateProductPrice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such product" });
  }

  try {
      const product = await Product.findByIdAndUpdate(
          id,
          { newPrice: req.body.newPrice },
          { new: true }
      );

      if (!product) {
          return res.status(400).json({ error: "No such product" });
      }

      res.status(200).json(product);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Like a product
const getLikes = async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'No such product' });
      }
      product.likes += 1;
      await product.save();
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ message: 'Error liking product', error });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  updateProductPrice,
  getLikes
};
