import { useState, useEffect } from "react"
import "./styles/main.css"
import Logo from "./assets/logo.svg"

import Game from "./components/Games"
import CreateAdBanner from "./components/CreateAdBanner"
import { CreateAdModal } from "./components/CreateAdModal"

import * as Dialog from "@radix-ui/react-dialog"
import axios from "axios"

interface Game {
    id: string
    title: string
    bannerUrl: string
    _count: {
        ads: number
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        axios("http://localhost:7777/games/")
            .then((response) => setGames(response.data))
    }, [])

    return (
        <>
            <img src={Logo} alt="" />
            <h1 className="text-6xl text-white font-black mt-20">
                Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.
            </h1>
            <div className="grid grid-cols-6 gap-6 mt-16 max-w-[80%]">
                {games.map((game) => {
                    return (
                        <Game
                            key={game.id}
                            name={game.title}
                            ads={game._count.ads}
                            bannerUrl={game.bannerUrl}
                        />
                    )
                })}
            </div>
            
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>
        </>
    )
}

export default App
