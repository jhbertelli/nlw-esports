import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { Entypo } from "@expo/vector-icons"

import { GameParams } from "../../@types/navigation"
import { styles } from "./styles"
import { THEME } from "../../theme"
import logoImg from "../../assets/logo-nlw-esports.png"

import { Background } from "../../components/Background"
import { Heading } from "../../components/Heading"
import { ConnectCard, ConnectCardProps } from "../../components/ConnectCard"
import { ConnectMatch } from "../../components/ConnectMatch"

export function Game() {
    const [connect, setConnect] = useState<ConnectCardProps[]>([])
    const [discordSelected, setDiscordSelected] = useState('')

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams
    
    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.0.7:7777/ads/${adsId}/discord`)
            .then((response) => response.json())
            .then((data) => setDiscordSelected(data.discord))
    }

    useEffect(() => {
        fetch(`http://192.168.0.7:7777/games/${game.id}/ads`)
            .then((response) => response.json())
            .then((data) => setConnect(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image source={logoImg} style={styles.logo} />
                    <View style={styles.right}></View>
                </View>
                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.banner}
                    resizeMode="cover"
                />
                <Heading
                    title={game.title}
                    subtitle="Conecte-se e comece a jogar!"
                />

                <FlatList
                    data={connect}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ConnectCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                    horizontal
                    style={styles.containerList}
                    contentContainerStyle={[connect.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                />
                <ConnectMatch 
                    visible={discordSelected.length > 0}
                    discord={discordSelected}
                    onClose={() => setDiscordSelected('')}
                />
            </SafeAreaView>
        </Background>
    )
}
