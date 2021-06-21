import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    // regNo: {
    //     type: Number,
    //     required: true
    // },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    id: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
export default User; 