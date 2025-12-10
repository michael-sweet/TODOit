import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext, useEffect, useMemo, useState } from "react";
import { AppState, View, TouchableOpacity, Linking, Text, StyleSheet } from "react-native";
import * as Notifications from 'expo-notifications';
import ScheduleNotifications from "@/api/notifications";
import { CustomThemeContext } from "@/constants/data";
import { DEFAULT_STYLES } from "@/constants/styles";
import { Theme } from "@/types/theme";
import { DataContext } from "@/contexts/data";

export default function NotificationPermissionBanner() {
    const [notificationsGranted, setNotificationsGranted] = useState(true)
    const [notificationsCanAsk, setNotificationsCanAsk] = useState(true)
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const data = useContext(DataContext)

    function checkNotifications() {
        Notifications.getPermissionsAsync().then((status) => {
            setNotificationsGranted(status.granted)
            setNotificationsCanAsk(status.canAskAgain)
        });
    }

    useEffect(() => {
        checkNotifications()

        const subscription = AppState.addEventListener('change', state => {
            if (state === 'active') {
                checkNotifications()
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    if (notificationsGranted) {
        return
    }

    return (
        <View style={styles.notificationsDisabledContainer}>
            <MaterialIcons name='warning' size={24} style={{color: THEME.danger}} />
            <View>
                <Text style={defaultStyles.text}>Notifications disabled!</Text>

                {!notificationsCanAsk &&
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: THEME.text}}>Please enable in </Text>
                        <TouchableOpacity onPress={Linking.openSettings}>
                            <Text style={{color: THEME.primary}}>app settings</Text>
                        </TouchableOpacity>
                    </View>
                }

                {notificationsCanAsk &&
                    <TouchableOpacity onPress={() => ScheduleNotifications(data)}>
                        <Text style={{color: THEME.primary}}>Enable notifications</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    notificationsDisabledContainer: {
        marginTop: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15
    }
})