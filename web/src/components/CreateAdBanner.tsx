import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"

export default function CreateAdBanner() {
    return (
        <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden w-[80%] mx-auto">
            <div className="bg-[#2A2634] py-6 px-8 rounded-md flex justify-between items-center">
                <div>
                    <strong className="text-white text-2xl font-black block">
                        Não encontrou seu duo?
                    </strong>
                    <span className="text-zinc-400 block">
                        Publique um anúncio para encontrar novos players!
                    </span>
                </div>
                <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}
