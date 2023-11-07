'use client'
import React from 'react'
import star from '../images/star.png'
import remove from '../images/remove.png'

console.log(star.src)

export default function Watchlist(){
const [ list, setList ] = React.useState('')
const [ movieList, setMovieList ] = React.useState('')


React.useEffect(function(){
    let movies = localStorage.getItem('movies')
    movies = movies.split(' ').slice(0, list.length - 1)
    setList( movies )
    setMovieList(document.getElementById('movie-results'))

    console.log(list)
}, [ ])


const card = (data) => `
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
                                        <img id='add' data-imdbID='${data.imdbID}' src='${remove.src}'>
                                        <p id='add' data-imdbID='${data.imdbID}'>Remove</p>
                                    </div>
                                </div>
                                <p>${data.Plot}</p>
                            <div>
                        </div>
                `


React.useEffect(function(){

    for ( let id in list ){
        console.log(list)
        fetch(`https://www.omdbapi.com/?i=${list[id]}&apikey=37bc2f93`)
        .then(res => res.json())
        .then(data => 
            movieList ? movieList.innerHTML +=  card(data) :  'chit'
        )
    }
}, [list])



function whatever(e){

    if (e.target.dataset.imdbid){
        console.log(`starting val: ${localStorage.getItem('movies')}`)
        let str = localStorage.getItem('movies').split(' ')
        let arr = str.slice(0, str.length - 1)
        let index = arr.indexOf(e.target.dataset.imdbid)
        arr = arr.filter(i => i !== e.target.dataset.imdbid)
        console.log(arr)
        localStorage.setItem('movies', `${arr.join(' ')} `)
        console.log(arr)
        for ( let id in arr ){
            console.log(arr)
            movieList.innerHTML = ''
            fetch(`https://www.omdbapi.com/?i=${arr[id]}&apikey=37bc2f93`)
                .then(res => res.json())
                .then(data => 
                    movieList.innerHTML += card(data)
                )
}
        if (arr.length = 0){
            movieList.innerHTML = ''            
        }
        if (localStorage.getItem('movies') == " "){
            localStorage.removeItem('movies')
            movieList.innerHTML = ''
        }
        console.log(`ending val: ${localStorage.getItem('movies')}`)
    }
}

//  localStorage.removeItem('movies')
    return (
        <div>
            <div id='header'>
                <h1 id='title'>Find Your Film</h1>
                <p><a href='./'>Search for movies</a></p>
            </div>
            <div id='movie-results' className='movie-results watchlist' onClick={e => whatever(e)}>
            </div>
        </div>
    )
}