import mongoose from "mongoose";
const billSchema = new mongoose.Schema(
    {
        date: { type: String, required: true },
        billno: { type: String, required: true },
        address: { type: String, required: false },
        amount: { type: Number, required: true },
        uid: { type: String, required: true },
        status: { type: String, required: true, enum: ["Paid", "Unpaid"] }
    }
)
const bill = mongoose.model('Bill', billSchema);
export default bill;