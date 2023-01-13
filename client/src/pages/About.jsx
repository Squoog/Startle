import React from 'react';
import "../About.css";
import {Howl} from "howler";

function About() {

// const audioTest = "http://localhost:8080/audio/1673540108800.ogg"

const newSoundUrl = `/audio/1673633900965.ogg`
// const soundPlay = (src, status) => {
//   const sound = new Howl ({
//     src,
//     html5: true,
//   })
//   if (status=== "play"){
//   sound.play()
//   }
//   if(status=== "stop"){
//   sound.pause()
//   }
// }
// function startAudio(){
//   soundPlay(audioTest, "play")
// }
// function stopAudio(){
//   soundPlay(audioTest, "stop")
// }
 
// soundPlay(audioTest, "play")

const newSoundPlay = {
  push: new Howl ({
    src: newSoundUrl,
    loop: true,
  })
}


    return (
        <div className="App">
            <br/>
            <br/>
            <h1>LEARN</h1>
            <br/>
            <h2>Welcome to Startle, the App that does... something.</h2>
            <br/>
            <h3>We'll add to this later</h3>
            <button onClick={() => {newSoundPlay.push.play()}}>Test Start Audio</button>
            {/* <button onClick={() => {newSoundPlay.push.stop()}}>Test Stop Audio </button> */}
            <p>In the meantime, this page will be used to test styling</p>
        </div>
    );
}

export default About;