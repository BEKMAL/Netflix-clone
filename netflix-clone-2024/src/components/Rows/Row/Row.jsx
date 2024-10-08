
import React, { useEffect, useState,useRef } from 'react'
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const prevtrailerurl=useRef("");

    const base_url = "https://image.tmdb.org/t/p/original";


    useEffect(() => {
        (async () => {
            try {
               
                const request = await axios.get(fetchUrl);
               
                setMovie(request.data.results);
            } catch (error) {
                console.log("error", error);
            }
        })()
       
        
    }, [fetchUrl]);
  
    const handleClick = (movie) => {
       
        // if (trailerUrl)  {
        //     setTrailerUrl('')
        // } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
            // movieTrailer( null, { tmdbId: movie.id} ) 
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    if(trailerUrl && prevtrailerurl.current==urlParams.get('v'))
                    {
                        setTrailerUrl('') 
                    }
                    else
                      setTrailerUrl(urlParams.get('v'));
                    
                   
                   
                    
                })
              
        // }
       
        prevtrailerurl.current=trailerUrl
       
       
    }
    
    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }
  return (
    <div className="row">
    <h1>{title}</h1>
    <div className="row__posters">
        {movies?.map((movie, index) => (
            <img
                onClick={() => {handleClick(movie);}}
                key={index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            />
        ))}
    </div>
    <div style={{ padding: '40px' }}>
       
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
         
    </div>
</div>
  )
}

export default Row