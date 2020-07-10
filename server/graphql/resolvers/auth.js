const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { transformUser } = require('./merge');


module.exports = {
    users: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        } else if (!req.isAdmin){
            throw new Error('Unauthorized')
        }
        try {
            const users = await User.find()
            return users.map(transformUser);
        } catch (err) {
            throw err;
        }
    },
    createUser: async args => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email})
            if (existingUser) {
                throw new Error('User exists already')
            }
            const hashedPW = await bcrypt.hash(args.userInput.password, 12)

            const newUser = {
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                email: args.userInput.email,
                password: hashedPW,
            };

            if (typeof args.userInput.accountType !== 'undefined') {
                const accountType = args.userInput.accountType;
                if (["free", "paid", "admin"].includes(accountType)) {
                    Object.assign(newUser, { accountType });
                    if ( accountType === "admin" ) {
                        Object.assign(newUser, { isAdmin: true });
                    }
                } else {
                    throw new Error('Invalid Account Type');
                }
            }

            const user = new User(newUser);
            const result =  await user.save()
            return transformUser(result);
        } catch (err) {
            throw err
        }
    },
    validate: async ({token}) => {
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.message === 'jwt expired') {
                throw new Error('TOKEN_EXP');
            } else {
                throw err;
            }
        }
        if (!decodedToken) {
            throw new Error('TOKEN_ERROR');
        }
        return {
            userId: decodedToken.userId,
            firstName: decodedToken.firstName,
            accountType: decodedToken.accountType,
            isAdmin: decodedToken.isAdmin,
            token: token
        }
    },
    login: async ({ email, password }) => {
        if (email === "") {
            throw new Error('Please enter an email address.')
        }
        if (password === "") {
            throw new Error('Password may not be blank.')
        }
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('Login failed! Please check your credentials.')
            }
            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                throw new Error('Login failed! Please check your credentials.')
            }

            const token = jwt.sign({
                "userId": user.id,
                "firstName": user._doc.firstName,
                "isAdmin": user._doc.isAdmin,
                "accountType": user.accountType
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            return {
                userId: user.id,
                firstName: user._doc.firstName,
                accountType: user._doc.accountType,
                isAdmin: user._doc.isAdmin,
                token: token
            }
        } catch (err) {
            throw err;
        }
    }
};