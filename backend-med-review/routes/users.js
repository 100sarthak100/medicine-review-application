import express from 'express';
import auth from '../middleware/auth.js';

import { getUsers, deleteUser, signin, signup, updateUser } from '../controllers/users.js'

const router = express.Router();

// ADD USER ROUTES HERE
router.get('/', auth, getUsers);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
// router.put('/:id', auth, updateUser);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;
