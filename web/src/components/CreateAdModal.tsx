import * as Dialog from "@radix-ui/react-dialog"
import * as Checkbox from "@radix-ui/react-checkbox"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { Check, GameController } from "phosphor-react"
import { FormEvent, useEffect, useState } from "react"

import { Input } from "./Form/Input"
import axios from "axios"

interface Game {
    id: string
    title: string
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [voiceChannel, setVoiceChannel] = useState(false)

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if (!data.name) {
            return
        }

        try {
            await axios.post(`http://localhost:7777/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: voiceChannel
            })
            alert("Anúncio criado com sucesso")
        } catch (err) {
            console.log(err)
            alert("Erro ao criar o anúncio")
        }
    }

    useEffect(() => {
        axios("http://localhost:7777/games/").then((response) =>
            setGames(response.data)
        )
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl font-black">
                    Publique um anúncio
                </Dialog.Title>
                <form
                    onSubmit={handleFormSubmit}
                    className="mt-6 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">
                            Qual o game?
                        </label>
                        <select
                            id="game"
                            name="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                            defaultValue=""
                        >
                            <option disabled value="">
                                Selecione o game que deseja jogar
                            </option>

                            {games.map((game) => {
                                return (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">
                            Seu nome (ou nickname)
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Como te chamam dentro do game?"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="yearsPlaying"
                                className="font-semibold"
                            >
                                Joga há quantos anos?
                            </label>
                            <Input
                                id="yearsPlaying"
                                name="yearsPlaying"
                                type="number"
                                placeholder="Tudo bem ser ZERO"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord" className="font-semibold">
                                Qual seu Discord?
                            </label>
                            <Input
                                id="discord"
                                name="discord"
                                placeholder="Usuario#0000"
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays" className="font-semibold">
                                Quando costuma jogar?
                            </label>
                            <ToggleGroup.Root
                                type="multiple"
                                className="grid grid-cols-4 gap-2"
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    title="Domingo"
                                    value="0"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("0")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Segunda"
                                    value="1"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("1")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Terça"
                                    value="2"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("2")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Quarta"
                                    value="3"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("3")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Quinta"
                                    value="4"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("4")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Sexta"
                                    value="5"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("5")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    title="Sábado"
                                    value="6"
                                    className={`w-8 h-8 rounded ${
                                        weekDays.includes("6")
                                            ? "bg-violet-500"
                                            : "bg-zinc-900"
                                    }`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label
                                htmlFor="hourStart"
                                className="font-semibold"
                            >
                                Qual horário do dia?
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    id="hourStart"
                                    name="hourStart"
                                    type="time"
                                    placeholder="De"
                                />
                                <Input
                                    id="hourEnd"
                                    name="hourEnd"
                                    type="time"
                                    placeholder="Até"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={voiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setVoiceChannel(true)
                                } else {
                                    setVoiceChannel(false)
                                }
                            }}
                            id="useVoiceChannel"
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400"></Check>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="useVoiceChannel">
                            Costumo me conectar ao chat de voz
                        </label>
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}
