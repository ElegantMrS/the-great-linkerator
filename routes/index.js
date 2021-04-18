const apiRouter = require('express').Router();

const {
  getAllLinks,
  createLinkTag,
  getLinksByTagName
} = require('../db');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get("/links", async (req, res, next) => {
  try {
    const links = await getAllLinks();

    res.send(links);

  } catch (error) {
    next(error);
  }
});

apiRouter.get("/tags/:tagName/links", async (req, res, next) => {
  try {
    const { tagName } = req.params;

    const links = await getLinksByTagName(tagName);

    res.send(links);

  } catch (error) {
    next(error);
  }
});

apiRouter.post("/links", async (req, res, next) => {
  try {
    const { link, comment, tag } = req.body;
    // or req.params

    const linkTag = await createLinkTag({ link, comment, tag });

    res.send(linkTag);

  } catch (error) {
    next(error);
  }
});




module.exports = apiRouter;
