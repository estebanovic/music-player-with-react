import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {

  const audioRef = useRef();
  const sourceRef = useRef();
  const [currentSong, changeSong] = useState(0);
  // const [percentageCurrentSong, setPercentageCurrentSong] = useState(0);
  const [playText, setPlaytext] = useState("fas fa-play");
  const [songs, setSongs] = useState([
    { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" }]);

  const getSongs = async () => {
    try {
      const response = await fetch('https://assets.breatheco.de/apis/sound/songs');
      if (response.ok) {
        const data = await response.json();
        setSongs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setInterval(() => {
  //   if (audioRef.current !== undefined) {
  //     setPercentageCurrentSong(Math.floor((100 / audioRef.current.duration) * audioRef.current.currentTime));
  //     console.log(percentageCurrentSong);
  //   }
  // }, 1000);

  useEffect(() => {
    getSongs();
  }, [])

  function previousSong() {
    if (currentSong <= 0) {
      changeSong(songs.length - 1);
    } else {
      changeSong(currentSong - 1);
    }
    sourceRef.current.src = "https://assets.breatheco.de/apis/sound/" + songs[currentSong].url
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  }

  function nextSong() {
    if (currentSong >= songs.length - 1) {
      changeSong(0);
    } else {
      changeSong(currentSong + 1);
    }
    sourceRef.current.src = "https://assets.breatheco.de/apis/sound/" + songs[currentSong].url
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setPlaytext("fas fa-pause");
  }

  function changSongWithIndex(i) {
    changeSong(i);
    sourceRef.current.src = "https://assets.breatheco.de/apis/sound/" + songs[currentSong].url
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
    setPlaytext("fas fa-pause");
  }

  function play() {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaytext("fas fa-pause");
    } else {
      audioRef.current.pause();
      setPlaytext("fas fa-play");
    }

  }



  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-12 col-md-6">
          <ul className="list-group list-group-striped">
            {songs.length > 0 ? songs.map((song, i) =>
              <li onClick={() => changSongWithIndex(i)} className={"list-group-item list-group-item-action " + (currentSong === i ? "list-group-item-primary" : "list-group-item-dark")} key={i}>{song.id + ". " + song.name}</li>
            ) : ""}
          </ul>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        {/* <div className="col-10 progress mb-5">
          <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          <style>{".progress-bar {width: 50%}"}</style>
        </div> */}
        <div className="col-10 col-md-3 d-flex justify-content-between">
          <div onClick={previousSong}>
            <i className="fas fa-backward fa-2x"></i>
          </div>
          <div onClick={play}>
            <i className={playText + " fa-2x"}></i>
          </div>
          <div onClick={nextSong}>
            <i className="fas fa-forward fa-2x"></i>
          </div>
        </div>
        <audio ref={audioRef} className="col-12 col-md-5">
          <source ref={sourceRef} src={"https://assets.breatheco.de/apis/sound/" + songs[currentSong].url} type="audio/ogg" />
        </audio>
      </div>
    </div>
  );
}

export default App;
