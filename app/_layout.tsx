import Logo from '@/components/Logo';
import { CustomThemeContext } from '@/constants/data';
import { LIGHT_THEME, DARK_THEME, createNavStyles } from '@/constants/styles';
import { loadAsync } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScheduleNotifications from "@/api/notifications";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@react-navigation/native';
import { DefaultData } from '@/constants/defaultData';
import { Undo } from '@/types/undo';
import { UndoContext, SetUndoContext } from '@/contexts/undo';
import Purchases from 'react-native-purchases';
import { DataContext, DataDispatchContext, DataReducer } from '@/contexts/data';
import { UpdateProStatus } from '@/api/paywall';
import * as SystemUI from 'expo-system-ui';

const dataStorageKey = 'data'
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, setLoaded] = useState(false);
    const colorScheme = useColorScheme();
    const [data, dataDispatch] = useReducer(DataReducer, DefaultData)
    const [undo, setUndo] = useState<Undo>(null)
    const isDarkTheme = colorScheme == 'dark'
    const theme = isDarkTheme ? DARK_THEME : LIGHT_THEME
    const navTheme:ReactNavigation.Theme = useMemo(() => createNavStyles(theme, isDarkTheme), [theme])

    function handleUndo(undo:Undo) {
        if (!undo) {
            setUndo(null)
            return
        }
        setUndo({
            ...undo,
            action: () => {
                undo?.action()
                setUndo(null)
            }
        } as Undo)
    }

    useEffect(() => {
        StatusBar.setBackgroundColor(theme.background)
        SystemUI.setBackgroundColorAsync(theme.backgroundSecondary)
    }, [theme])


    // Load saved data and fonts
    useEffect(() => {
        async function load() {
            try {
                if (Platform.OS !== 'web') {
                    const data = await AsyncStorage.getItem(dataStorageKey)
                    if (data) {
                        dataDispatch({type: 'set_data', data: JSON.parse(data)})
                    }
                    Purchases.configure({ apiKey: 'goog_CqYDOVekwLSQPDwpylbfggqRfnu' });
                    await UpdateProStatus(dataDispatch)
                }
                await loadAsync({
                    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
                    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
                    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf")
                })
            } catch (e) {
                console.warn(e);
            } finally {
                setLoaded(true);
            }
        }
        load();
    }, []);

    // Set notifications and save data to file on state change
    useEffect(() => {
        if (Platform.OS !== 'web' && loaded) {
            ScheduleNotifications(data)
            AsyncStorage.setItem(dataStorageKey, JSON.stringify(data))
        }
    }, [data, loaded])

    const onLayoutRootView = useCallback(() => {
        if (loaded) {
            SplashScreen.hide();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <CustomThemeContext.Provider value={colorScheme == 'dark' ? DARK_THEME : LIGHT_THEME}>
            <ThemeProvider value={navTheme}>
                <DataContext.Provider value={data}>
                    <DataDispatchContext.Provider value={dataDispatch}>
                        <UndoContext.Provider value={undo}>
                            <SetUndoContext.Provider value={handleUndo}>
                                <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                                    <Stack
                                        screenOptions={{
                                            headerTitle: () => <Logo />
                                        }}
                                    />
                                </GestureHandlerRootView>
                            </SetUndoContext.Provider>
                        </UndoContext.Provider>
                    </DataDispatchContext.Provider>
                </DataContext.Provider>
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
}
