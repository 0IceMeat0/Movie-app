import React, { Component } from "react";
import './filmitem.css';
import { cutTitle, cutDescription, dataReform } from "../../services/helpers";
import Raiting from "../Raiting/Raiting";
import defaultPoster from './noimage.jpg';
import { Rate } from 'antd'

export default class FilmItem extends Component {
  render() {
    const { itemProps, genres, handleChange, valueStar, isRatedTab } = this.props;
    const moiveData = dataReform(itemProps.release_date);
    const movieTitle = cutTitle(itemProps.title);
    const movieDescription =
      itemProps.genre_ids.length > 3
        ? cutDescription(itemProps.overview, 10)
        : cutDescription(itemProps.overview, 20);
       
    const imgProps = itemProps.poster_path !== null ? `https://image.tmdb.org/t/p/original/${itemProps.poster_path}` : defaultPoster;
       
    const maxDisplayedGenres = 3; 

    const movieGenres = itemProps.genre_ids.slice(0, maxDisplayedGenres).map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre ? (
        <span key={genre.id} className="genre__one">{genre.name}</span>
      ) : null;
    });

    if (isRatedTab === '2') { 
      console.log(valueStar);
      return (
        <div className="movie-list__item">
          <img className="item__photo" src={imgProps} alt=" " />
          <div className="item__text">
            <h1 className="item__title">{movieTitle}</h1>
            <p className="item__date">{moiveData}</p>
            <p className="item__genre">{movieGenres}</p>
            {movieDescription} 
            <Rate
              value={valueStar ? valueStar.find(item => item.movieId === itemProps.id)?.ratingValue : 0}
              onChange={(ratingValue) => handleChange(ratingValue, itemProps.id)}
              count={10}
              className="rate"
              disabled={true}
            />
          </div>
          <Raiting vote_average={itemProps.vote_average}/>
        </div>
      );
    }

    return (
      <div className="movie-list__item">
        <img className="item__photo" src={imgProps} alt=" " />
        <div className="item__text">
          <h1 className="item__title">{movieTitle}</h1>
          <p className="item__date">{moiveData}</p>
          <p className="item__genre">{movieGenres}</p>
          {movieDescription} 
          <Rate
            value={valueStar ? valueStar.find(item => item.movieId === itemProps.id)?.ratingValue : 0}
            onChange={(ratingValue) => handleChange(ratingValue, itemProps.id)}
            count={10}
            className="rate"
            
          />
        </div>
        <Raiting vote_average={itemProps.vote_average}/>
      </div>
    );
  }
}