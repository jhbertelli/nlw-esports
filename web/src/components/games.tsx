interface GameProps {
    name: string
    ads: number
    gameNum: number
}

function Game(props: GameProps) {
    let num = "game-" + props.gameNum + ".png"
    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={num} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
                <strong className="text-white font-bold block">
                    {props.name}
                </strong>
                <span className="text-zinc-300 text-sm block">
                    {props.ads} anúncios
                </span>
            </div>
        </a>
    )
}

function Games() {
    return (
        <div className="grid grid-cols-6 gap-6 mt-16">
            <Game name="League of Legends" ads={9} gameNum={1} />
            <Game name="Apex Legends" ads={3} gameNum={2} />
            <Game name="Counter Strike" ads={7} gameNum={3} />
            <Game name="World of Warcraft" ads={4} gameNum={4} />
            <Game name="Dota 2" ads={4} gameNum={5} />
            <Game name="Fortnite" ads={5} gameNum={6} />
        </div>
    )
}

export default Games
