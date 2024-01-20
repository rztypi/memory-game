import { shuffle } from "./utils.js";

const apiUrl = "https://api.imgflip.com/get_memes";

const fetchAndSetData = async (setApiData, signal) => {
  try {
    const response = await fetch(apiUrl, { signal });
    const json = await response.json();
    shuffle(json.data.memes);
    setApiData(json.data.memes);
  } catch (error) {
    console.error(error);
  }
};

export { fetchAndSetData };
