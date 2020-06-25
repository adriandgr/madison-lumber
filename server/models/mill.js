const mongoose = require('mongoose');


const millSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        type: String,
        region: String,
        contact: {
            address: String,
            location: String,
            phone: Array,
            fax: String,
            website: String,
            email: String,
            contactPersons: Array
        },
        catalog: {
            products: Array,
            species: Array,
            roughSizes: Array,
            surfacedSizes: Array,
            production: String,
            panelThickness: String,
            services: Array,
            kilnCapacity: String,
            shipping: Array,
            export: Array
        },
        qualifications: {
            gradingAgency: String,
            memberOf: Array,
            employees: String,
            notes: String,
            certification: String,
            preservatives: String,
            treatingFacilities: String,
            distributionYard: String,
            millStatus: String
        },
        lastUpdated: Date
    },
    { timestamps: true }
);

module.exports = mongoose.model('Mill', millSchema);