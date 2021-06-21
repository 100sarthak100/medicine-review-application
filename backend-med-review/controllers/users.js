import mongoose from 'mongoose';
import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ADD USER CONTROLLER HERE

export const getUsers = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    if (user.isAdmin === false) {
        return res.json({ message: 'You are not an admin!!' });
    }

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId;
    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);
    if (user.isAdmin === false) {
        return res.json({ message: 'You are not an admin!!' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndDelete(id);

    res.json({ message: 'user deleted successfully' });
};

// Update user method 2
// export const updateUser = async (req, res) => {
//     const { id } = req.params;

//     const userId = req.userId;
//     if(!userId) {
//         return res.json({message : 'Not authorized!!'});
//     }
//     if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
//     const user = await User.findById(userId);
//     if(user.isAdmin === false) {
//         return res.json({message: 'You are not an admin!!'});
//     }

//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

//     const newUser = {
      
//         email : req.body.email,
//         password : req.body.password,
//         isAdmin : req.body.isAdmin,
//         _id : id
//     }

//     await User.findByIdAndUpdate(id, newUser, {new : true});
//     res.json({message : 'user updated successfully!'})
// }

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exists." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords didn't match" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ firstName, lastName, email, password: hashedPassword, isAdmin });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: "1h" });

        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};

// Update user method 1
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;

    if (!userId) {
        return res.json({ message: 'Not authorized!!' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send(`No user with id: ${userId}`);
    const user = await User.findById(userId);

    if (userId == id || user.isAdmin) {
        const { email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords didn't match" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = {
            email, hashedPassword, _id: id
        };

        await User.findByIdAndUpdate(id, updatedUser, { new: true });
        res.status(200).json("User Info Updated");
    }
    else
        res.json({ message: "Not authorized!!" })
}
