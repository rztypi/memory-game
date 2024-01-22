import { shuffle } from "./utils.js";

const fetchAndSetData = async (setApiData, signal) => {
  const apiUrl = "https://api.imgflip.com/get_memes";
  try {
    const response = await fetch(apiUrl, { signal });
    const json = await response.json();
    shuffle(json.data.memes);
    setApiData(json.data.memes);
  } catch (error) {
    console.error(error);
  }
};

const fetchGifData = async (tag, signal) => {
  const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${
    import.meta.env.VITE_GIPHY_API_KEY
  }&tag=${tag}&rating=g`;
  try {
    const response = await fetch(apiUrl, { signal });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchAndSetData, fetchGifData };
