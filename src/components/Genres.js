import { Chip } from '@material-ui/core';
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type, 
    setPages,

}) => {


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPages(1); 
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
          );
          setGenres([...genres, genre]);
          setPages(1);
    }
    const fetchGenres = async() => {
        const {data} = await axios.get(
            `
            https://api.themoviedb.org/3/genre/movie/list?api_key=ed97225188027086f6a1b2fc58810d1d&language=en-US`
        );
        setGenres(data.genres);      

    };

    // console.log(genres);
    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        }; // eslint-disable-next-line
    }, [])
  return (
    <div style={{padding: "6px 0"}}>
        {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color = "primary"
          clickable
          size="small"
          onDelete={()=> handleRemove(genre)}
        />
      ))}
    
        {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}

    </div>
  )
}

export default Genres