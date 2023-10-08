import { create_tiles } from "./index.js";
import { play_test } from "./index.js";


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
};

// var game = new Phaser.Game(config);
export function start() {
    var game = new Phaser.Game(config);
}

// Initialize game variables
var tiles;
var tileSpeed = 2; // Adjust the tile speed as needed
var score = 0;
var scoreText;
var tile_list;
var start_game = false;
var has_started = false;
var timestep_start = 0;
var starting_timestep;


// Load game assets
function preload() {
    this.load.image("background", "./img/background.png");
    this.load.image('tile', './img/tile_green.png'); // Replace 'tile.png' with your tile image
    this.load.image("start_button", "./img/start_button.png");
}

function key_pressed(event) {
    console.log(event)
    console.log(Phaser.Input.Keyboard.KeyCodes.A)
    let search;
    switch (event.keyCode) {
        case (Phaser.Input.Keyboard.KeyCodes.A):
            console.log("A pressed")
            search = 250
            break;
        case (Phaser.Input.Keyboard.KeyCodes.S):
            console.log("S pressed")
            search = 350
            break;
        case (Phaser.Input.Keyboard.KeyCodes.D):
            console.log("D pressed")
            search = 450
            break;
        case (Phaser.Input.Keyboard.KeyCodes.F):
            console.log("F pressed")
            search = 550
            break;
        default:
    }

    tiles.children.iterate(function (tile) {
        if (tile != null && tile.y > 410 && tile.y < 590 && tile.x == search) {
            tile.destroy();
            score += 1
            console.log("Score + 1")
        }
    });
}

// Create game elements
function create() {

    this.add.image(400, 300, "background");
    this.start_button = this.add.image(400, 300, "start_button").setInteractive();


    this.start_button.on('pointerup', () => {
        start_game = true;
        this.start_button.destroy();
        play_test();
     });

    tile_list = create_tiles();
    tiles = this.physics.add.group();


    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#000'
    });


    this.input.keyboard.on('keydown-A', key_pressed, this);
    this.input.keyboard.on('keydown-S', key_pressed, this);
    this.input.keyboard.on('keydown-D', key_pressed, this);
    this.input.keyboard.on('keydown-F', key_pressed, this);
    
}


// Update game logic
function update(timestep, dt) {

    if (!start_game) {
        return;
    }

    if (timestep_start == 0 ) {
        if (!has_started) {
            starting_timestep = timestep + 1500;
            has_started = true
            return;
        } else {
            if (timestep >= starting_timestep) {
                timestep_start = timestep;
            } else {
                return;
            }
        }
    }
    

    // dt = time between steps
    // timestep = total time

    // console.log("timestep: " + timestep);
    // console.log("dt: " + dt);

    // console.log("----");

    timestep = timestep - timestep_start;

    if (timestep >= tile_list[0][1]) {
        console.log("Current timestep: " + timestep + "\t larger than tile+list: " + tile_list[0][1]);
        tiles.create(250 + Math.floor(Math.random() * 4) * 100, -45, "tile");
        tile_list.shift();
    }


    tiles.children.iterate(function (tile) {
        if (tile != null) {
            tile.y += tileSpeed;

            // Remove tiles when they reach the bottom
            if (tile.y > 600) {
                tile.destroy();
            }

        }
    });
}


