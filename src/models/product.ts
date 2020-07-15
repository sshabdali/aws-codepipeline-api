import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productNo: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    userId: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);
export default Product