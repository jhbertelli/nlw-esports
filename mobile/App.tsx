import { useEffect, useRef } from "react"
import { StatusBar } from "react-native"
import {
    useFonts,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
} from "@expo-google-fonts/inter"
import { Subscription } from "expo-modules-core"
import * as Notifications from "expo-notifications"

import { Routes } from "./src/routes"

import "./src/services/notificationConfigs"
import { getPushNotifToken } from "./src/services/getPushNotifToken"

import { Background } from "./src/components/Background"
import { Loading } from "./src/components/Loading"

export default function App() {
    const getNotificationListener = useRef<Subscription>()
    const responseNotificationListener = useRef<Subscription>()

    useEffect(() => {
        getPushNotifToken()
    })

    useEffect(() => {
        getNotificationListener.current =
            Notifications.addNotificationReceivedListener((notif) => {
                console.log(notif)
            })
        
        responseNotificationListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {console.log(response)}
            )
        
            return () => {
                if (getNotificationListener.current && responseNotificationListener.current) {
                    Notifications.removeNotificationSubscription(getNotificationListener.current)
                    Notifications.removeNotificationSubscription(responseNotificationListener.current)
                }
            }
    }, [])

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_900Black
    })

    return (
        <Background>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <Routes></Routes> : <Loading />}
        </Background>
    )
}
