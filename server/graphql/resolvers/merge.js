const { dateToString } = require('../../helpers/date')
const Mill = require('../../models/mill');
const User = require('../../models/user');

const mills = async millIds => {
    try {
        const mills = await Mill.find({_id: {$in: millIds}})
        return mills.map(transformMill);
    } catch (err) {
        throw err;
    }
};

// const singleMill = async millId => {
//     try {
//         const mill = await Mill.findById(millId)
//         return transformMill(mill)
//     } catch (err) {
//         throw err;
//     }
// }

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            password: null,
            createdMills: mills.bind(this, user._doc.createdMills)
        };
    } catch (err) {
        throw err;
    }
}

const transformMill = mill => {
    return {
        ...mill._doc,
        _id: mill.id,
        lastUpdated: mill._doc.lastUpdated ? dateToString(mill._doc.lastUpdated) : "",
    }
}

const transformUser = user => {
    return {
        ...user._doc,
        _id: user.id,
        password: null,
        createdAt: dateToString(user._doc.createdAt),
        updatedAt: dateToString(user._doc.updatedAt)
    }
}

// const transformBooking = booking => {
//     return {
//         ...booking._doc,
//         _id: booking.id,
//         user: user.bind(this, booking._doc.user),
//         mill: singleMill.bind(this, booking._doc.mill),
//         createdAt: dateToString(booking._doc.createdAt),
//         updatedAt: dateToString(booking._doc.updatedAt)
//     }
// }

// exports.user = user;
// exports.mills = mills;
exports.transformMill = transformMill;
exports.transformUser = transformUser;

// exports.transformBooking = transformBooking;