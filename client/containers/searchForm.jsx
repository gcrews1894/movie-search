import React, {useState, useEffect} from 'react';
import background from "../assets/background.jpg"
import MovieCard from '../components/MovieCard'

const api_key = '3e9f0b5997c94b7352290d792ff6a616'




// const axios = require("axios").default;
// const options = {
//   method: 'GET',
//   url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
//   params: {s: searchQuery, r: 'json'},
//   headers: {
//     'x-rapidapi-key': '9c078d3651mshf820295ecc2e260p1595b8jsn1066e4d45398',
//     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });



export default function searchForm () {
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState()
    const [cardDetails, setCardDetails] = useState([])
    const [movieCards, setMovieCards] = useState()
    const axios = require("axios").default;

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // const handleClick = () => {
    //     let modSearch = search.split(' ').join('+')
    //     const searching = {
    //       method: 'GET',
    //       url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    //       params: {s: modSearch, r: 'json'},
    //       headers: {
    //         'x-rapidapi-key': '9c078d3651mshf820295ecc2e260p1595b8jsn1066e4d45398',
    //         'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    //       }
    //     };

    //     axios.request(searching)
    //         .then((response) => {
    //             console.log(response.data)
    //             setSearchResults(response.data.Search)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    // const getDetails = (arr) => {
    //     if (!arr) return
    //     let detailsArr = []
    //     for (let i = 0; i < arr.length; i++) {
    //         const details = {
    //             method: 'GET',
    //             url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    //             params: {i: arr[i].imdbID, r: 'json'},
    //             headers: {
    //               'x-rapidapi-key': '9c078d3651mshf820295ecc2e260p1595b8jsn1066e4d45398',
    //               'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
    //             }
    //           };
              
    //         axios.request(details).then((response) => {
    //             // console.log('card details', response.data);
    //             detailsArr.push(response.data)
    //         }).catch((error) => {
    //             console.error(error);
    //         });

    //     }
    //     setCardDetails(detailsArr)
    //     console.log('Card Details', cardDetails, cardDetails[0])
    //     if (cardDetails.length > 0) setLoading(false)
    // }
    
    const handleClick = (e) => {
        let modSearch = search.split(' ').join('+')
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${modSearch}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data.results)
                setLoading(false)
            })
            // .then (() => setLoading(false))
            .catch (err => console.log(err))
    }


    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])


    return loading ? (
        <div className="background">
            <div className="container">
                <h1>Enter a Movie Title</h1>
                <form onSubmit={(e) => e.preventDefault()} >
                    <input type="text" className="searchField" value={search || ''} onChange={handleChange}/>
                    <input type='submit' value="Search" className="searchButton" onClick={(e) => handleClick(e)}/>
                </form>
            </div>
        </div>
    ) : (
        <div className="background2">
                <h1 className="searchResults">Search Results</h1>
                <div className="resetDiv">
                    <button className="resetButton" onClick={() => setLoading(true)}>Search Again</button>
                </div>
                {searchResults.map((result, index) => {
                    console.log('building cards')
                    return (
                        <MovieCard key={index} movieID={result.id} title={result.title} release={result.release_date} description={result.overview} />
                    )
                })}
        </div>
    )
}