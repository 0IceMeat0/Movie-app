import React, {Component} from "react";
import FilmItem from "../FilmItem/FilmItem.js";
import './filmlist.css';

export default class FilmList extends Component {

render(){
  const { todos, genres, handleChange, valueStar, activeTab } = this.props;
  const elements = todos.map((item) => {
    const { id } = item;
    
    return (
      <li key={id}>
        <FilmItem
         itemProps={item}
          genres={genres}
          handleChange={handleChange}
          valueStar={valueStar}
          RatedTab={activeTab}
        />
      </li>
    );
  });

  return <ul className="movie-list">{elements}</ul>;
}
}