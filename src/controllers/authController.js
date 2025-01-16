import bcrypt from 'bcryptjs'
import { createToken } from '../libs/index.js';
import { User } from '../models/index.js'

export async function register(req, res) {
    const { username, email, password } = req.body

    try {
        // Validating if user exists
        const isUserExisting = await User.findOne({ email })
        if (isUserExisting) return res.status(400).json(['An user with this email already exists'])

        // Creating the user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        // Generating the token
        const token = await createToken({id: savedUser._id})
        res.cookie('token', token).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        })
    } catch (error) {
        console.error(error)
    }
}

export async function login(req, res) {
    const { email, password } = req.body

    try {
        // Validating if user does not exist
        const isUserExisting = await User.findOne({ email })
        if (!isUserExisting) return res.status(400).json(['Incorrect email or password'])
        
        // Validating if passwords match
        const isValidPassword = await bcrypt.compare(password, isUserExisting.password)
        if (!isValidPassword) return res.status(400).json(['Incorrect email or password'])

        // Generating the token
        const token = await createToken({ id: isUserExisting._id })
        res.cookie('token', token).json({
            id: isUserExisting._id,
            username: isUserExisting.username,
            email: isUserExisting.email
        })
    } catch (error) {
        console.error(error)
    }
}

export async function logout(req, res) {
    res.cookie('token', '', { expires: new Date(0) }).sendStatus(200)
}

export async function getUser(req, res) {
    const { id } = req.user

    try {
        const user = await User.findOne({ _id: id })
        if (!user) return res.cookie('token', '', { expires: new Date(0) }).status(400).json({ message: 'Invalid session' })

        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        console.error(error)
    }
}