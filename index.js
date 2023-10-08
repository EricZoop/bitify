import {MidiParser} from './midi-parser.js'
import { start } from './phaser.js';


var midi_json;
var curr_bpm;


// const sbutton = document.getElementById("upload-button")
// sbutton.onclick = uploadFile;


window.onload = function(){
    // configure MIDIReader
    var source = document.getElementById('fileupload');
    MidiParser.parse( source, function(obj){
        // Your callback function
        console.log(obj);
        // document.getElementById("output").innerHTML = JSON.stringify(obj, undefined, 2);
        midi_json = obj;
        start();
    });
};


// Exports an array of instructions in the format
// arr[0] = current bpm at that moment
// arr[1] = current number of miliseconds passed in the song
export function create_tiles() {
    let tiles = []
    let total_time = 0;

    for (let i in midi_json.track) {
        let track = midi_json.track[i];
        let time_elapsed = 0;

        // console.log("TRACK:")
        // console.log(track)

        for (let j in track.event) {
            let event = track.event[j];

            // console.log("EVENT:")
            // console.log(event)

            if (event.type == 255) {
                switch(event.metaType) {
                    case 81:
                        curr_bpm = (1 / (event.data / 1000000)) * 60
                        break;

                    case 88:
                        // time signature, metronome clicks, size of beat in 32nd notes
                        break;
                }
            } else {
                time_elapsed += event.deltaTime;
                total_time += event.deltaTime;

                if (time_elapsed / 1000 >= (1 / (curr_bpm / 60))) {
                    tiles.push([curr_bpm, total_time]);
                    time_elapsed = 0;
                }
            }
            
        }
    }


    console.log("TILE_LIST: ")
    console.log(tiles)
    return tiles;
}



export function play_test() {
    var audio = document.getElementById("test");
    audio.play();
}


async function uploadFile() {
    let formData = new FormData(); 
    formData.append("file", fileupload.files[0]);
    await fetch('/upload.php', {
      method: "POST", 
      body: formData
    }); 
    alert('The file has been uploaded successfully.');
    }

