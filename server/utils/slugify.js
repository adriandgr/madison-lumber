require('dotenv').config();

const mongoose = require('mongoose');
const Mill     = require('../app/models/mill');

function slugify(text) {
  // Connect to db
  mongoose.connect(process.env.DB_URI);

  // Find all mills
  const mills = Mill.find({}, (err, mills) => {
    if(err) {
      throw err;
    }

    // Close db connection
    mongoose.connection.close();

    // Parse mill name, slugify it
    let slug = text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text

    // Find existing slugs
    const existingSlugs = mills.map(mill => mill.slug);

    let index = 1;
    if(existingSlugs.includes(slug)) {
      // Append number to slug until it is unique
      while(existingSlugs.includes(slug)) {
        slug.split('-').pop();
        slug += `-${index}`;
        index++;
      }
    } else {
      // New slug; just append -1 to it
      slug += '-1';
    }

    return slug;
  });
}
module.exports = slugify;