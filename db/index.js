
const { Client } = require('pg');
const DB_NAME = 'linkerator-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// ************************************** DB methods: links **************************************

async function createLink ({url, clickCount, comment, date, tags}) {
  try {
    const { rows: [link] } = await client.query(`
        INSERT INTO links(url, click_count, comment, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [url, clickCount, comment, date]);

        const tagList = await createTags(tags);

        return await addTagsToLink(link.id, tagList);

  } catch (error) {
    throw error;
  }
}

// async function getAllLinks () {
//   try {
//     const { rows: links } = await client.query(`
//       SELECT *
//       FROM links;
//     `);

//     return links;
//   } catch (error) {
//     throw error;
//   }
// }

async function getAllLinks () {
  try {
    const { rows: links } = await client.query(`
      SELECT * FROM links;
    `);

    const { rows: tags } = await client.query(`
    SELECT tags.*
    FROM tags
    JOIN link_tags ON tags.id = link_tags."tagId";
  `);

  links.map(link => {

    let linktags = [];

    tags.forEach((tag) => {
      if (tag.linkId === link.linkId) {
        linktags.push(tag.name)
      }
    })

    link.tags = linktags;
  })

  return links;
  
  } catch (error) {
    throw error;
  }
}

async function getLinkById(linkId) {
  try {
    const { rows: [ link ]  } = await client.query(`
      SELECT *
      FROM links
      WHERE id=$1;
    `, [linkId]);

    const { rows: tags } = await client.query(`
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagId"
      WHERE link_tags."linkId"=$1;
    `, [linkId]);

    link.tags = tags;

    return link;

  } catch (error) {
    throw error;
  }
}

// ************************************** DB methods: tags **************************************

async function createTags (tagList) {
  
  if (tagList.length === 0) { 
    return; 
  }

  const insertValues = tagList.map(
    (_, index) => `$${index + 1}`).join('), (');

  const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');

  try {
    await client.query(`
    INSERT INTO tags(name)
    VALUES (${insertValues})
    ON CONFLICT (name) DO NOTHING;
    `, tagList);
    
    const { rows } = await client.query(`
    SELECT * FROM tags
    WHERE name
    IN (${selectValues});
    `, tagList);

    return rows;
   
  } catch (error) {
    throw error;
  }
}

async function getAllTags () {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM tags;
    `)
  } catch (error) {
    throw error;
  }
}

// ************************************** DB methods: link_tags **************************************

async function createLinkTags (linkId, tagId) {
  
  try {
    const { rows: linkTags } = await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);

    console.log('createLinkTag success');

    return linkTags;

  } catch (error) {
    throw error;
  }
}

async function createLinkTag (linkId, tagId) {
  
  try {
    const { rows: [linkTag] } = await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `, [linkId, tagId]);

    console.log('createLinkTag success')
    return linkTag;

  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map(
      tag => createLinkTags(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    const linkWithTags = await getLinkById(linkId);

    return linkWithTags;

  } catch (error) {
    throw error;
  }
}

async function getLinksByTagName(tagName) {
  try {
    const { rows: links } = await client.query(`
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id = link_tags.links_id
      JOIN tags ON tags.id = link_tags.tags_Id
      WHERE tags.name=$1;
    `, [tagName]);

    return await Promise.all(links.map(
      (link) => getLinkById(link.id)));

  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
  client,
  createLink,
  getAllLinks,
  getLinkById,
  createTags,
  getAllTags,
  createLinkTag,
  addTagsToLink,
  getLinksByTagName
}