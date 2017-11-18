const modelUtils = {
  buildIndex: ({
    schema = {}, index = { type: {}, options: {} }
  }) => {
    schema.index(index.type, index.options);
    console.log(`Built index`);
  },
  dropIndex: ({
    model = {}, index = `Name of index`
  }) => {
    model.collection.getIndexes((err, indexes) => {
      if(err) {
        console.error(err);
      }
      if(indexes[index]) {
        model.collection.dropIndex(index, err => {
          if(err) {
            console.error(`Error in dropping index: ${err}`);
          }
          console.log(`Successfully dropped '${index}'`);
        });
      } else {
        console.log(`Index already exists`);
      }
    });
  }
};

module.exports = modelUtils;