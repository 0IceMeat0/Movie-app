

export default class SwapiServive {


    apiBase = new URL('https://api.themoviedb.org/3/');
    apiKey = "c5227d06361d3bcc6179a54d714eb7a9";


  
  async getMovies(query, page){
    const searchUrl = new URL('search/movie', this.apiBase);
    const params = {
      api_key: this.apiKey,
      language: 'en-US',
      query,
      page,
    };
      const searchParams = new URLSearchParams(params);

      searchUrl.search = searchParams.toString();
  
      const res = await fetch(searchUrl);
  
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
  
      const body = await res.json();
  
      if (body.results.length === 0) {
        throw new Error('Yours film not found');
      }
      
     
      return body;
    }
  
    async getGenres() {
      try {
        const genresUrl = new URL('genre/movie/list', this.apiBase);
        genresUrl.searchParams.append('api_key', this.apiKey);
    
        const res = await fetch(genresUrl);
    
        if (!res.ok) {
          throw new Error('Failed to get genre list.');
        }
        const body = await res.json();
        return body;
      } catch (e) {
        if (e.message === 'Failed to fetch') {
          throw Error('Server is unavailable');
        }
        throw Error(e);
      }
    }
    async getSession() {
      try {
        const url = new URL('authentication/guest_session/new', this.apiBase);
        url.searchParams.append('api_key', this.apiKey);
    
        const response = await fetch(url, { method: 'GET', headers: { accept: 'application/json' } });
    
        if (!response.ok) {
          throw new Error('Failed to fetch session.');
        }
    
        const data = await response.json();
    
        window.localStorage.setItem('GUEST_SESSION_ID', data.guest_session_id);
    
        return data;
      } catch (error) {
        throw new Error('Error getting guest session: ' + error.message);
      }
    }

    
    
  }
