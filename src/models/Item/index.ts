import mongoose from "mongoose";

const indexSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Item = mongoose.model("Item", indexSchema);
export default Item;
