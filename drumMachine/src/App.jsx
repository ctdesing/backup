import { useState, useEffect } from "react";
import clap from 'url:./assets/sounds/clap.wav'
import crash from 'url:./assets/sounds/crash.wav'
import kick from 'url:./assets/sounds/kick.wav'
import snare from 'url:./assets/sounds/snare.wav'
import tom from 'url:./assets/sounds/tom.wav'

const App = () => {
    const [ effects, setEffects ] = useState(null)
    // const audio = new Audio(sound)

    useEffect(() => {
        const effectColumns = [null, null, null, null, null]
        const sounds = {
            "clap": clap,
            "crash": crash,
            "kick": kick,
            "snare": snare,
            "tom": tom
        }

        const _effects = Object.keys(sounds).map(key => {
            return { title: key, sound: sounds[key], columns: [...effectColumns] }
        })

        setEffects(_effects)
    }, [])

    const drawGrid = () => {
        
    }



    return (
        <>
            <h1>Hello World!</h1>
            <div>

            </div>
        </>
    )
}

export default App