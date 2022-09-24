import "./styles/main.css"
import Logo from "./assets/logo.svg"
import Games from "./components/games"
import { MagnifyingGlassPlus } from "phosphor-react"

function App() {
    return (
        <>
            <img src={Logo} alt="" />
            <h1 className="text-6xl text-white font-black mt-20">
                Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.
            </h1>
            <Games />
            <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
                <div className="bg-[#2A2634] py-6 px-8 rounded-md flex justify-between items-center">
                    <div>
                        <strong className="text-white text-2xl font-black block">
                            Não encontrou seu duo?
                        </strong>
                        <span className="text-zinc-400 block">
                            Publique um anúncio para encontrar novos players!
                        </span>
                    </div>
                    <button className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
                        <MagnifyingGlassPlus size={24} />
                        Publicar anúncio
                    </button>
                </div>
            </div>
        </>
    )
}

export default App
