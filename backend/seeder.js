import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";


import User from "./models/userModel.js";


import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import products from "./data/products.js";
import plasticColors from "./data/plastic_colors.js";
import plasticTypes from "./data/plastic_types.js";
import PlasticColor from "./models/plasticColorModel.js";
import PlasticType from "./models/plasticTypeModel.js";
import RecyclableProduct from "./models/recyclableProductModel.js";
import recyclableProducts from "./data/recyclable_products.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Suppression des données existantes
    await User.deleteMany();
    await Product.deleteMany();
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
   

    // Insertion de nouvelles données
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // Récupération de l'administrateur

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    await PlasticColor.insertMany(plasticColors)
    await PlasticType.insertMany(plasticTypes)
    /await RecyclableProduct.insertMany(recyclableProducts)

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await PlasticColor.deleteMany()
    await PlasticType.deleteMany()
    await RecyclableProduct.deleteMany()
   

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
