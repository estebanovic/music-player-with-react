import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import React, { useRef, useState } from 'react';

function App() {
  const songs = [
    { "id": 1, "category": "game", "name": "Mario Castle", "url": "files/mario/songs/castle.mp3" },
    { "id": 2, "category": "game", "name": "Mario Star", "url": "files/mario/songs/hurry-starman.mp3" },
    { "id": 3, "category": "game", "name": "Mario Overworld", "url": "files/mario/songs/overworld.mp3" }
  ];
  const audioRef = useRef();
  const sourceRef = useRef();
  const [currentSong, changeSong] = useState(0);

  const [playText, setPlaytext] = useState("fas fa-play");

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
        <div className="col-6">
          <ul className="list-group list-group-striped">
            {songs.map((song, i) =>
              <li onClick={() => changSongWithIndex(i)} className={"list-group-item " + (currentSong === i ? "list-group-item-primary" : "list-group-item-dark")} key={song.id}>{song.id + ". " + song.name}</li>
            )}
          </ul>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">

        <div className="col-3 d-flex justify-content-between">
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
        <audio ref={audioRef} className="col-5">
          <source ref={sourceRef} src={"https://assets.breatheco.de/apis/sound/" + songs[currentSong].url} type="audio/ogg" />
        </audio>
      </div>
      </div>
      );
}

      export default App;
