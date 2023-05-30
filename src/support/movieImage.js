import { config } from "./config.js";

const movieImage = (details) => {
  const apiKey = config.image_api_key;

  const fetchPromises = details.map((eachMovie) => {
    const movieName = encodeURIComponent(eachMovie.name);
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const posterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
          eachMovie.posterUrl = posterUrl;
          return eachMovie;
        } else {
          console.log("Movie not found!");
          return null;
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        return null;
      });
  });

  return Promise.all(fetchPromises).then((updatedDetails) =>
    updatedDetails.filter((detail) => detail !== null)
  );
};

const fetchFilms = async () => {
  try {
    const response = await fetch(
      "https://app.codescreen.com/api/assessments/films",
      {
        method: "GET",
        headers: {
          Authorization: config.data_api_key,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const jsonData = await response.json();
    const updatedDetails = await movieImage(jsonData);
    return updatedDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { fetchFilms };
