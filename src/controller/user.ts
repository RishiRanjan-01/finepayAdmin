import { Router } from 'express';
import User from '../models/user';
import { validateMobile, validateEmail } from '../middleware/validation';

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - dob
 *         - gender
 *         - mobile
 *         - email
 *         - city
 *         - state
 *         - kyc_status
 *         - bank_details
 *         - photos
 *         - product_type
 *       properties:
 *         user_id:
 *           type: string
 *         name:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         mobile:
 *           type: string
 *         email:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         kyc_status:
 *           type: string
 *           enum: [pending, done]
 *         bank_details:
 *           type: object
 *         photos:
 *           type: string
 *         product_type:
 *           type: string
 *       example:
 *         user_id: '12345'
 *         name: John Doe
 *         dob: '1990-01-01'
 *         gender: Male
 *         mobile: '1234567890'
 *         email: johndoe@example.com
 *         city: New York
 *         state: NY
 *         kyc_status: pending
 *         bank_details: {}
 *         photos: 'https://example.com/photo.jpg'
 *         product_type: Product A
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

// Create a new user with validation middleware
router.post('/crate/user', validateMobile, validateEmail, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */

// Get all users
router.get('getUsers/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Retrieve one user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: One User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */

// Get a user by user_id
router.get('getUser/:user_id', async (req, res) => {
  try {
    const user = await User.find({user_id:req.params.user_id});
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Update a user by user_id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

// Update a user
router.put('/:user_id', validateMobile, validateEmail, async (req, res) => {
  try {
    const user = await User.updateOne({user_id:req.params.user_id}, req.body, { new: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete a user by user_id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

// Delete a user
router.delete('/:user_id', async (req, res) => {
  try {
    const user = await User.deleteOne({user_id:req.params.user_id});
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
