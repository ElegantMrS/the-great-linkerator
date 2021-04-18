import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get("/");

    return data;

  } catch (error) {
    throw error;
  }
}

export async function getAllLinks() {
  try {
    const { data } = await axios.get(`/api/links`);

    return data;

  } catch (error) {
    throw error;
  }
}


export async function getLinksByTag(tagName) {
  try {
    const { data } = await axios.get(`/api/tag/${tagName}/links`);

    return data;

  } catch (error) {
    throw error;
  }
}

export async function createLink(linkUrl, linkComment, tagList = []) {
  try {
    const { data } = await axios.post("/api/links", {
      link: linkUrl,
      comment: linkComment,
      tags: tagList,
    });

    return data;

  } catch (error) {
    throw error;
  }
}

export async function placeHolder () {
  
}