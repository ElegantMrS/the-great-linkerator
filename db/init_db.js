// code to build and initialize DB goes here
const {
  client,
  createLink,
  getAllLinks,
  getLinkById,
  createTags,
  getAllTags,
  createLinkTag,
  addTagsToLink,
  getLinksByTagName
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS link_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS links;
    `);

    console.log("Finished dropping tables");

    await client.query(`
    CREATE TABLE links (
      id SERIAL PRIMARY KEY,
      url TEXT UNIQUE NOT NULL,
      click_count INTEGER DEFAULT 0,
      comment TEXT NOT NULL,
      date DATE DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE link_tags (
      "linkId" INTEGER REFERENCES links(id),
      "tagId" INTEGER REFERENCES tags(id),
      UNIQUE("linkId", "tagId")
    );
    
    `)

    console.log("Finished building tables");

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {

  try {
    console.log("Starting to create links");

    await createLink({ url: 'https://techcrunch.com/?guccounter=1', clickCount: 1, comment: 'Great site for tech news.', date: null, tags: ['tech'] });
    await createLink({ url: 'https://dribbble.com/shots/popular', clickCount: 1, comment: 'Cool design inspiration and digital art.', date: null, tags: ['art'] });
    await createLink({ url: 'https://artsandculture.google.com/story/EAWBV8wSttrp6g', clickCount: 1, comment: '"blacktronica" cool google story to come back to.', date: null, tags: ['music'] });

    console.log("Finished creating links");
    // console.log("Starting to create tags");

    // const tagsToCreate = [
    //   { name: ['tech', 'news'] },
    //   { name: ['art', 'design'] },
    //   { name: ['music', 'culture'] },
    // ]

  } catch (error) {
    throw error;
  }
}

// async function createInitialTags() {
//   try {
//     console.log("Starting to create tags");

//     await Promise.all(createTags(tagList));

//     console.log("Finished seeding tables");
//   } catch (error) {
//     throw error;
//   }
// }

// async function createInitialLinkTags() {
//   try {
//     console.log("Starting to create link_tags");

//     await createLinkTag({ linkId: 1, tagId: 1 });
//     await createLinkTag({ linkId: 2, tagId: 2 });
//     await createLinkTag({ linkId: 3, tagId: 3 });

//   } catch (error) {
//     throw error;
//   }
// }

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());