const Mill = require('../../models/mill');
const User = require('../../models/user');
const shortid = require('shortid');
const { transformMill } = require('./merge');


module.exports = {
    mills: async ({resultFilters}, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try {
            const {uuid, query, count, offset} = resultFilters || { uuid: undefined, query: '', count: 20, offset: 0 } 

            if (uuid) {
                const mill = await Mill.findOne({uuid})
                return [mill].map(transformMill)
            }
            
            const options = {
                skip: offset,
                limit: count
            }
            
            const mills = await Mill.find({ name: new RegExp(query) }, null, options)
            return mills.map(transformMill);
        } catch (err) {
            throw err;
        }
    },
    createMill: async (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!')
        // }

        try {
            const existingMill = await Mill.findOne({name: args.millInput.name})
            if (existingMill) {
                throw new Error('Mill exists already')
            }
            console.log(args.millInput)

            const newMill = { ...args.millInput }

            if (typeof args.millInput.lastUpdated !== 'undefined') {
                Object.assign(newMill, { lastUpdated: new Date(args.millInput.lastUpdated) });
            }

            const mill = new Mill({
                ...newMill,
                uuid: shortid.generate()
            });
            const result = await mill.save()

            return transformMill(result);
        } catch (err)  {
            console.log(err);
            throw err;
        }
    },
}