import React from 'react'
import './App.css'
import { useState, useEffect, useRef } from 'react'

export default function App() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);
    const [display, setDisplay] = useState(false)
    const appRef = useRef(null)

    const handleClickOutSide = (event) => {
        if (appRef.current && !appRef.current.contains(event.target)) {
            setDisplay(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutSide)
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=25&#39')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    return (
        <div className='App' ref={appRef}>
            <input type="text"
                placeholder='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={() => setDisplay(true)}
            />
            <div className='container'>
                {display && data
                    .filter(el => el.title.includes(search))
                    .map(el =>
                        <div className='item' key={el.id}>
                            <span>{el.title}</span>
                            <img src={el.thumbnailUrl} alt="" width="20px" height="20px" />
                        </div>
                    )}
            </div>
        </div>
    )
}
