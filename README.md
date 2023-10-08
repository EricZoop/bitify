# bitify

For those that just want song convertor and no website

**Python Method**

Download - FluidSynth https://www.fluidsynth.org/ 
Download - Midi2Audio https://github.com/bzamecnik/midi2audio
from midi2audio import FluidSynth
fs = FluidSynth('8bitsf.SF2')
fs.midi_to_audio('your_midifile.mid', 'output.wav')

**CMD Method**

Download - FluidSynth https://www.fluidsynth.org/
fluidsynth 8bitsf.SF2 -F output.wav your_midifile.mid

**Credit for Sound Font**
TheEighthBit https://musical-artifacts.com/artifacts/23
