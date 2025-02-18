import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        consumer_num: {
            type: String,
            required: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema);
export default User;
