import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { Entypo } from "@expo/vector-icons"

import { styles } from "./styles"
import logoImg from "../../assets/logo-nlw-esports.png"
import { THEME } from "../../theme"
import { GameParams } from "../../@types/navigation"

import { Background } from "../../components/Background"
import { Heading } from "../../components/Heading"
import { ConnectCard, ConnectCardProps } from "../../components/ConnectCard"

export function Game() {
    const [connect, setConnect] = useState<ConnectCardProps[]>([])

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams

    useEffect(() => {
        fetch(`http://192.168.0.7:7777/games/${game.id}/ads`)
            .then((response) => response.json())
            .then((data) => setConnect(data))
    }, [])

    function handleGoBack() {
        navigation.goBack()
    }

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
                        <ConnectCard data={item} onConnect={() => {}} />
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
            </SafeAreaView>
        </Background>
    )
}
