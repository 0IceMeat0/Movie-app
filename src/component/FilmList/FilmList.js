import React from "react";
import FilmItem from "../FilmItem/FilmItem.js";
import './filmlist.css';

function FilmList({ todos, genres, handleChange, valueStar, activeTab }) {
  const elements = todos.map((item) => {
    const { id } = item;
    
    return (
      <li key={id}>
        <FilmItem
         itemProps={item}
          genres={genres}
          handleChange={handleChange}
          valueStar={valueStar}
          isRatedTab={activeTab}
        />
      </li>
    );
  });

  return <ul className="movie-list">{elements}</ul>;
}

export default FilmList;