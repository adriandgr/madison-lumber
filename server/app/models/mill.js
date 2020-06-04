const mongoose = require('mongoose');
const shortid = require('shortid');
const { buildIndex, dropIndex } = require('./modelUtils');

// Initialize mill schema
const millSchema = require('./schemas/mill');
millSchema.pre('save', function(next) {
    this.uuid = shortid.generate();
    next();
});

// Import & build mill index
const millIndex = require('./indexes/mill');
buildIndex({ schema: millSchema, index: millIndex });


////////////////////
//   ~ Plugins ~  //
////////////////////

// const uniqueSlugs = require('mongoose-uniqueslugs');
const mongoosePaginate = require('mongoose-paginate');

// Modifies schema for use of uniqueSlugs
// uniqueSlugs.enhanceSchema(millSchema, {source: 'name'});
// Adds paginate plugin to schema
millSchema.plugin(mongoosePaginate);


////////////////////
// ~ Mill model ~ //
////////////////////
const millModel = mongoose.model('Mill', millSchema);

// Ensures save is retried on dup key error
// uniqueSlugs.enhanceModel(millModel);

// Dropping the index is one (likely inefficient) means of ensuring that whenever
// the mill model is required, the index is automatically reindexed, meaning any
// changes to the above index will be rebuilt automatically; see:
// https://github.com/Automattic/mongoose/issues/3148.
dropIndex({ model: millModel, index: 'mill_index' });

module.exports = millModel;