const { Player } = require('midi-player-js')
const keys = require('./keys');

class PianoPlayer {
    constructor(clients) {
        this.clients = clients;
        this.player = new Player();

        this.player.on('playing', evt => {
            // evt.tick
        });

        this.player.on('fileLoaded', () => {

        });

        this.player.on('midiEvent', evt => {
            if (evt.channel == 10) return;

            if (evt.name == 'Note on') {
                this.startNote(keys[evt.noteName], evt.velocity / 127);
                // let cl = this.clients[Object.values(keys).indexOf(keys[evt.noteName])];
                // if (!cl) return;
                // cl.sendArray([{m: 'm', x: Object.values(keys).indexOf(keys[evt.noteName]), y: (evt.velocity / 127) * 100 }])
            } else if (evt.name == 'Note off' || (evt.name == 'Note on' && evt.velocity == 0)) {
                this.stopNote(keys[evt.noteName]);
            }
        })
    }

    /**
     * Load a MIDI file
     * @param {string} path Path to file
     */
    loadFile(path) {
        this.player.loadFile(path);
        this.player.play();
    }

    startNote(note, vel) {
        let cl = this.clients[Object.values(keys).indexOf(note)]
        if (!cl) return;
		if (vel > 1) vel = 1;
        cl.startNote(note, vel);
    }

    stopNote(note) {
        let cl = this.clients[Object.values(keys).indexOf(note)]
        if (!cl) return;
        cl.stopNote(note);
    }
}

module.exports = {
    PianoPlayer
}
