const Product = require("../models/product");
const statusMessage = require("../helpers/status.message");

module.exports = {
  addProduct: async (req, res) => {
    try {
      let data = req.body;

      const newProduct = {
        user: req.userData.id,
        name: data.name,
        price: data.price,
        stock: data.stock,
        image_url: data.image_url,
      };
      console.log("here add newProduct controller" );

      const product = await Product.create(newProduct);

      statusMessage(res, true, "success add new product", product);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  findProduct: async (req, res) => {
    try {
      const product = await Product.find({}).populate("user", [
        "id",
        "username",
        "email",
      ]);
      console.log("here list Product: controller");
      statusMessage(res, true, "success to find product", product);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByIdAndRemove({ _id: id }).populate(
        "user"
      );
      console.log("ini product yang terhapus controller");
      statusMessage(res, true, "success to delete product", product);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        $pull: req.userData.id,
      });

      const findProduct = await Product.findOne({ _id: id });

      console.log("ini product yang berhasil di update");
      statusMessage(res, true, "success to update product", findProduct);
      // statusMessage(res, true, "success to update product", product);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });

      statusMessage(res, true, "success to find product", product);
    } catch (error) {
      statusMessage(res, false, error.message);
    }
  },
};
