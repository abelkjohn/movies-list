'use client'
import React from "react";
import plus from "../images/plus.png"
import star from "../images/star.png"
import Link from "next/link";

export default function Search(){
    const [ query, setQuery ] = React.useState('')
    const [ results, setResults ] = React.useState('')

    React.useEffect(function(){
    const movieList = document.getElementById('movie-results')
    movieList.innerHTML = ''
    const query = document.getElementById("query").value
    let searchItems = []
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=37bc2f93`)
        .then(res => res.json())
        .then(data => {
            searchItems = (data.Search ? data.Search.map(i => i.imdbID) : '')
            for (let id in searchItems){
                let result = {}
                fetch(`https://www.omdbapi.com/?i=${searchItems[id]}&apikey=37bc2f93`)
                    .then(res => res.json())
                    .then(data => {
                        movieList.innerHTML += `
                        <div id='item-card'>
                            <img class='poster' src='${data.Poster}'>
                            <div class='movie-desc'>
                                <div class='title-rating'>
                                    <h3>${data.Title}</h3>
                                    <div class='flex'>
                                        <img src='${star.src}'>
                                        <p>${data.imdbRating}</p>
                                    </div>
                                </div>
                                <div class='info'>
                                    <p>${data.Runtime}</p>
                                    <p class='align'>${data.Genre}</p>
                                    <div id='add' data-imdbID='${data.imdbID}' class='flex'>
                                        <img id='add' data-imdbID='${data.imdbID}' src='${plus.src}'>
                                        <p id='add' data-imdbID='${data.imdbID}'>Watchlist</p>
                                    </div>
                                </div>
                                <p>${data.Plot}</p>
                            <div>
                        </div>
                        `
                        }
                        
                    )
                    
            }
    })
    }, [ query ])

    function temp(e){
        if (e.target.id == 'add'){
            if (localStorage.getItem("movies")[0] == ''){
            localStorage.removeItem('movies')
            console.log(localStorage.getItem("movies"))

            }
            else if (localStorage.getItem("movies") === null){
                localStorage.setItem("movies", `${e.target.dataset.imdbid} `)
                console.log(localStorage.getItem("movies"))
            } else {
                let arr = localStorage.getItem("movies")
                localStorage.removeItem("movies")
                arr += `${e.target.dataset.imdbid} `
                localStorage.setItem('movies', `${arr}`)
                console.log(localStorage.getItem("movies"))
            }
        }
    }

    return (
    <div onClick={(e) => temp(e)}>
          <div id='nav'>
              <div id='header'>
                  <h1 id='title'>Find Your Film</h1>
                  <Link href='./watchlist'>My Watchlist</Link>
              </div>
                  <input id='query' className="search" type='text' placeholder="Search for a movie" onChange={e => setQuery(e.target.value)}></input>
              
          </div>
          <section className="movie-results" id='movie-results'>{results ? JSON.stringify(results.Search) : null}</section>
    </div>
    )
}