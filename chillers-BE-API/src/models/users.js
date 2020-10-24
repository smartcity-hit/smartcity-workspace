const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
            toInt: true,
            trim: true,
            validate(value) {
                if (!validator.isLength(value, { min: 9, max: 9 })) {
                    throw new Error('Invalid ID!');
                }
            }
        },
        userType: {
            type: String,
            required: true,
            trim: true,
            toInt: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email!');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        }
    },
    { timestamps: true, versionKey: false }
);

usersSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

usersSchema.methods.generateAuthToken = async function () {
    const user = this;
    const payload = { user };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 360000
    });
    return token;
};

usersSchema.statics.findByCredentials = async (id, password) => {
    const user = await User.findOne({ id });
    if (!user) {
        throw Error('ID is not valid');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Password is not valid');
    }

    return user;
};

usersSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
