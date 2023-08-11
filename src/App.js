import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import "./App.css";
import Movierow from "./components/Movierow/movierow.js";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie.js";
import Header from "./components/Header/header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListiner = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListiner);

    return () => {
      window.removeEventListener("scroll", scrollListiner);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => {
          return <Movierow key={key} title={item.title} items={item.items} />;
        })}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          ❤️
        </span>{" "}
        Por Maria Fernanda <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.legth <= 0 && (
        <div className="loading">
          <img
            src="https://c.tenor.com/Rfyx9OkRI38AAAAM/netflix-netflix-startup.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};
