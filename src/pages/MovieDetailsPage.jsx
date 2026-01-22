import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmbd";
import Poster from "../components/Poster/Poster";
import { BackLink } from "../components/BackLink/BackLink";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");

  useEffect(() => {
    getMovie();

    async function getMovie() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }
  }, [id]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  if (!movie) return;

  return (
    <>
      <BackLink to={backLinkHref.current}>Back to movies</BackLink>
      <div className={css.main}>
        <div className={css["poster-wrapper"]}>
          <Poster
            poster_path={movie.poster_path}
            title={movie.title}
            className={css.poster}
          />
        </div>
        <div className={css.details}>
          <h1 className={css.title}>{movie.title}</h1>
          <p>User Score: {movie.vote_average}%</p>
          <h2 className={css.subtitle}>Overview</h2>
          <p>{movie.overview}</p>
          <h2 className={css.subtitle}>Genres:</h2>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={css["more-info-menu"]}>
        <ul>
          <li className={css["navigation-item"]}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </li>
          <li className={css["navigation-item"]}>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
