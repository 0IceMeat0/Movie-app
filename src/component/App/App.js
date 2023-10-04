import React, { Component } from "react";
import FilmList from "../FilmList/FilmList";
import SwapiServive from "../../services/ApiMovie";
import './basesetting.css';
import Footer from "../Footer/Footer";
import SerchForm from "../SearchForm/SerchForm";
import { Spin, Tabs } from 'antd';
import { debounce } from 'lodash';
import { Online, Offline } from 'react-detect-offline';
import AlertError from "../AlertError/AlertError";
import LocalStorageService from "../../services/LocalStorageService";

export default class App extends Component {
  state = {
    todoData: [],
    todoDataGenres: [],
    valueStar: [],
    totalMovies: 0, 
    totalMoviesSet: false,
    query: '',
    loading: false,
    currentPage: 1,
    errorMessage: 'Try to input something',
    apiService: new SwapiServive(),
    error: false,
    guestSessionId: '',
    activeTab: "search",
    ratedList: []
  };

  componentDidMount() {
    const storedGuestSessionId = LocalStorageService.getItem('GUEST_SESSION_ID'); 
    if (storedGuestSessionId) {
      this.setState({
        guestSessionId: storedGuestSessionId,
        loading: false,
      });
    } 
  
    const storedValueStar = LocalStorageService.getItem('VALUE_STAR'); 
    const valueStar = storedValueStar ? JSON.parse(storedValueStar) : [];
  
    this.setState({
      valueStar: valueStar,
    });

    this.getRatedMovies(storedGuestSessionId, this.state.currentPage)
      .then(data => {
        this.setState({
          ratedList: data.results,
        });
      })
      .catch(error => {
        console.error('Error fetching rated movies:', error);
      });
  }
  
  debouncedSearch = debounce((query, page) => {
    this.fetchMovies(query, page);
  }, 2000);

  fetchMovies = (query, page) => {
    const apiService = new SwapiServive();
    const storedGuestSessionId = LocalStorageService.getItem('GUEST_SESSION_ID');

    if (storedGuestSessionId) {
      this.setState({
        guestSessionId: storedGuestSessionId,
      });
    } else {
      apiService.getSession()
        .then(data => {
          this.setState({
            guestSessionId: data.guest_session_id,
          });
          LocalStorageService.setItem('GUEST_SESSION_ID', data.guest_session_id);
        })
        
    }
    apiService.getGenres()
    .then(data =>{
      this.setState({
        todoDataGenres: data.genres,
      });
      
    })
    apiService.getMovies(query, page)
      .then(data => {
        this.setState({
          todoData: data.results,
          totalMovies: data.total_pages,
          loading: false
        });
      })
      .catch(error  => {
       this.onError(error);
      });
  }

  async rateMovie(movieId, guestSessionId, rateValue) {
    return await this.state.apiService.rateMovie(movieId, guestSessionId, rateValue);
}

async getRatedMovies(guestSessionId, currentPage) {
   return await this.state.apiService.getRatedMovies(guestSessionId, currentPage);
}

  onPagination = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
      loading: true,
      error: false
    });

    this.debouncedSearch(this.state.query, pageNumber);
  };

  onError = (error) => {
    this.setState({
      loading: false,
      error: true,
      errorMessage: error.message,
    });
  };

  onLabelChange = (evt) => {
    const { value } = evt.target;
    this.setState({
      query: value,
      loading: true,
      currentPage: 1,
      error: false
    });
    this.debouncedSearch(value, this.state.currentPage);
  };
  handleTabChange = (activeKey) => {
    this.setState({ activeTab: activeKey });
    if (activeKey === 'rated') { 
      const storedValueStar = LocalStorageService.getItem('VALUE_STAR');
      const valueStar = storedValueStar ? JSON.parse(storedValueStar) : [];
      this.getRatedMovies(this.state.guestSessionId, this.state.currentPage)
        .then(data => {
          this.setState({
            ratedList: data.results,
            valueStar
          });
        })
        .catch(error => {
          console.error('Error fetching rated movies:', error);
        });
    }
  }
  
  handleChange = async (ratingValue, movieId) => {
    const updatedValueStar = [...this.state.valueStar];
    const index = updatedValueStar.findIndex(item => item.movieId === movieId);
    if (index !== -1) {
      updatedValueStar[index] = { movieId, ratingValue };
    } else {
      updatedValueStar.push({ movieId, ratingValue });
    }

    this.setState({ valueStar: updatedValueStar }, async () => {
      try {
        LocalStorageService.setItem('VALUE_STAR', JSON.stringify(updatedValueStar));
  
        const response = await this.rateMovie(movieId, this.state.guestSessionId, ratingValue);
        console.log('Movie rated successfully:', response);

        const ratedMovies = await this.getRatedMovies(this.state.guestSessionId, this.state.currentPage);
        this.setState({
          ratedList: ratedMovies.results,
        });
  
      } catch (error) {
        console.error('Error rating movie:', error);

      }
    });
  }
  
  
  
  render() {
    const {
      todoData,
      loading,
      query,
      error,
      errorMessage,
      todoDataGenres,
      ratedList,
      valueStar,
      activeTab,
    } = this.state;
    const hasData = todoData.length > 0;
    const content = (
      <div>
        {loading && !error ? (
          <Spin tip="Loading" size="large" className="loader" />
        ) : null}
        {error ? (
          <AlertError errorMessage={errorMessage} />
        ) : null}
        {!loading && !error ? (
          <div>
            <FilmList valueStar={valueStar} activeTab={activeTab} todos={todoData}  handleChange={this.handleChange}  genres={todoDataGenres} />
            {hasData ? (
              <Footer currentPage={this.state.currentPage} onPageChange={this.onPagination} totalMovies={this.state.totalMovies} />
            ) : null}
          </div>
        ) : null}
      </div>
    );

    const items = [
      {
        key: 'search',
        label: 'Search',
        children: (
          <div className="container">
            <SerchForm  query={query} onLabelChange={this.onLabelChange} />
            <main className="main">
              {content}
            </main>
          </div>
        ),
      },
      {
        key: 'rated',
        label: 'Rated',
        children: (
          <div className="container">
            <main className="main">
              <FilmList valueStar={valueStar} activeTab={activeTab} todos={ratedList} genres={todoDataGenres} />
            </main>
          </div>
        ),
      }
    ];

    return (
      <section className="movieapp">
        <Offline>You're currently offline. Please check your connection.</Offline>
        <Online>
        <Tabs className="tabs" defaultActiveKey="search" items={items} onChange={this.handleTabChange} />
        </Online>
      </section>
    );
  }
}