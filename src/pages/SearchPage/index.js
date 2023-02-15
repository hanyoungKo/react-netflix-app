import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from '../../api/axios';
import "./SearchPage.css";

function SearchPage() {

  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get("q");

  useEffect(() => {
    if(searchTerm){
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie =  async (searchTerm)=>{
    try{
      const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
      console.log(request);
      setSearchResults(request.data.results)
    }catch (error){
      console.log(error)
    }
  }

  const renderSearchResults = () =>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
        
            return(
              <div className='movie'>
                <div className='movie_colmn-poster'>
                  <img src={movieImageUrl} alt="movie_image" className='movie_poster'/>
                </div>
              </div>
            );
          
          } 
        })}
      </section>
      )
    : (
      <section className='no-results'>
        <div className='no-results_text'>
          <p>
             찾으시는 검색어 "{searchTerm}" 에 맞는 영화를 찾을 수 없습니다.
          </p>  
        </div>

      </section>
    );
  };
  
  return renderSearchResults();
}

export default SearchPage