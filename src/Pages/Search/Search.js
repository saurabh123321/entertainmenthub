import { createMuiTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react'
import { Button } from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import {  useEffect } from 'react'
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0); 
 const [page, setPage] = useState(1); 
 const [content, setContent] = useState();
 const [numOfPages, setNumOfPages] = useState(); 
 const [searchText, setSearchText] = useState("");



  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });


  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=ed97225188027086f6a1b2fc58810d1d&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0,0); 
    fetchSearch(); 
    
    // eslint-disable-next-line
  }, [type, page]);



  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex", margin: "15px 0"}}>
          <TextField
            style={{flex: 1}}
            className = "searchBox"
            label="Search"
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
        
          />
          <Button variant='contained' style={{marginLeft:15}}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs value={type} 
        indicatorColor='primary' 
        textColor='primary'
        onChange={(event, newValue)=> {
          setType(newValue);
          setPage(1);
        }}
        >
            <Tab label="Search Movies" style={{width: "50%"}}/>
            <Tab label="Search TV Series" style={{width: "50%"}}/>

        </Tabs>


      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
     
    
  )
}

export default Search