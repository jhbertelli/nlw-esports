import { View, Image, FlatList } from "react-native"

import logoImg from "../../assets/logo-nlw-esports.png"
import { styles } from "./styles"

import { GAMES } from "../../utils/games"

import { Heading } from "../../components/heading"
import { GameCard } from "../../components/gameCard"

export function Home() {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Heading
                title="Encontre seu duo!"
                subtitle="Selecione o game que deseja jogar..."
            />
            <FlatList
                contentContainerStyle={styles.gamesList}
                data={GAMES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GameCard data={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            ></FlatList>
        </View>
    )
}
