import { View, Text, TouchableOpacity } from "react-native"
import { THEME } from "../../theme"
import { styles } from "./styles"
import { GameController } from "phosphor-react-native"

export interface ConnectCardProps {
    id: string
    name: string
    yearsPlaying: number
    weekDays: string[]
    hourStart: string
    hourEnd: string
    useVoiceChannel: boolean
}

interface Props {
    data: ConnectCardProps
    onConnect: () => void
}

export function ConnectCard({ data, onConnect }: Props) {
    const voiceColor = data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT

    return (
        <View style={styles.container}>
            <View style={styles.containerInside}>
                <Text style={styles.label}>Nome</Text>
                <Text style={[styles.value, { color: THEME.COLORS.TEXT }]} numberOfLines={1}>
                    {data.name}
                </Text>
            </View>
            <View style={styles.containerInside}>
                <Text style={styles.label}>Tempo de jogo</Text>
                <Text style={[styles.value, { color: THEME.COLORS.TEXT }]} numberOfLines={1}>
                    {data.yearsPlaying} anos
                </Text>
            </View>
            <View style={styles.containerInside}>
                <Text style={styles.label}>Disponibilidade</Text>
                <Text style={[styles.value, { color: THEME.COLORS.TEXT }]} numberOfLines={1}>
                    {data.weekDays.length} dia(s) &bull; {data.hourStart} - {data.hourEnd} 
                </Text>
            </View>
            <View style={styles.containerInside}>
                <Text style={styles.label}>Chamada de áudio?</Text>
                <Text style={[styles.value, { color: voiceColor }]} numberOfLines={1}>
                    {data.useVoiceChannel ? "Sim" : "Não" }
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={24}
                />
                <Text style={styles.buttonTitle}>Conectar</Text>
            </TouchableOpacity>
        </View>
    )
}
