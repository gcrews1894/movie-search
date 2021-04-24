import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function MovieCard (props) {
    const [isShown, setIsShown] = useState(false)
    const [details, setDetails] = useState()
    const [director, setDirector] = useState()
    const [writer, setWriter] = useState()
    const [star, setStar] = useState()

    const movieID = props.movieID
    const api_key = '3e9f0b5997c94b7352290d792ff6a616'
    let url = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${api_key}&language=en-US`

    const getDetails = () => {
        fetch(url)
            .then(res => res.json())
            .then (data => {
                console.log(data)
                setDetails(data)
            })
            .catch(err => console.log(err))
    }

    const getImportantDetails = (arr) => {
        let crew = details.crew
        let cast = details.cast
        setIsShown(!isShown)
        setDirector(crew.find((element) => element.job === 'Director'))
        setWriter(crew.find((element) => element.job === 'Screenplay' || element.job === 'Writer'))
        setStar(cast[0])
        console.log(director)
    }

    useEffect(() => {
        getDetails()
    }, [])
    return (
        <div className="movieCard">
            <div className="cardHeader">
                <h1>{props.title}</h1>
                <h3>{props.release}</h3>
            </div>
            {!isShown ? (
                <p>{props.description}</p>
            ) : (
                <div title="regular tooltip" className='hiddenMenu'>
                    <div className="credits">
                        {director ? <h3>{director.job + ': ' + director.name}</h3> : <h3>Director not Found</h3>}
                        {writer ? <h3>{writer.job + ': ' + writer.name}</h3> : <h3>Writer not Listed</h3>}
                        {star ? <h3>{'Starring: ' + star.name}</h3> : <h3>Stars not Available</h3>}
                    </div>
                </div>
        
            )}
            <div className="infoDiv">
                <button className="infoButton" onClick={()=> getImportantDetails(details)}>{!isShown? 'Show Cast and Crew' : 'Show Synopsis'}</button>
            </div>
        </div>
    )
}