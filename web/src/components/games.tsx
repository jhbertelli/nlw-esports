interface GameProps {
    name: string
    ads: number
    bannerUrl: string
}

function Game(props: GameProps) {
    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={props.bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
                <strong className="text-white font-bold block">
                    {props.name}
                </strong>
                <span className="text-zinc-300 text-sm block">
                    {props.ads} anúncio(s)
                </span>
            </div>
        </a>
    )
}

export default Game
