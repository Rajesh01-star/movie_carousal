import { useEffect, useState } from "react";
import { fetchFilms } from "../support/movieImage";
import styles from "../styles/Carousel.module.css";
import Card from "./Card";

export default function Carousel() {
  const [films, setFilms] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const films = await fetchFilms();
        setFilms(films);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);
  // console.log(films);

  return (
    <section className="h-screen w-screen flex items-center bg-black">
      <div className="w-screen h-96 overflow-hidden">
        <div
          className={`h-96 flex overflow-x-auto gap-8 py-4 ${styles.slideTrack} bg-black no-scrollbar`}
        >
          {films
            ? films.map((eachFilm, id) => {
                return (
                  <Card
                    key={id}
                    name={eachFilm.name}
                    length={eachFilm.length}
                    rating={eachFilm.rating}
                    imgUrl={eachFilm.posterUrl}
                  />
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
}
