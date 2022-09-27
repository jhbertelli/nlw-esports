import {
    View,
    Text,
    Modal,
    ModalProps,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from "phosphor-react-native"
import * as Clipboard from "expo-clipboard"

import { styles } from "./styles"
import { THEME } from "../../theme"

import { Heading } from "../Heading"
import { useState } from "react"

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function ConnectMatch({ discord, onClose, ...rest }: Props) {
    const [isCopying, setIsCopying] = useState(false)

    async function handleDiscordClipboard() {
        // copies discord id to clipboard
        setIsCopying(true)
        await Clipboard.setStringAsync(discord)
        Alert.alert(
            "Discord copiado!",
            "O Discord da sua dupla foi copiado para sua área de transferência."
        )
        setIsCopying(false)
    }

    return (
        <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />
                    <Heading
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    ></Heading>
                    <Text style={styles.label}>Adicione no Discord</Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleDiscordClipboard}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>{isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
