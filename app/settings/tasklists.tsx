import { CustomThemeContext, Configuration } from "@/constants/data";
import { Stack } from "expo-router";
import { useCallback, useContext, useMemo, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Theme } from "@/types/theme";
import NotificationPermissionBanner from "@/components/NotificationPermissionBanner";
import Undo from "@/components/Undo";
import Animated, { LinearTransition } from "react-native-reanimated";
import TaskSettingsPanel from "@/components/settings/Tasklist";
import AddTasklistBtn from "@/components/settings/tasklist/AddTasklistBtn";
import { DataContext } from "@/contexts/data";
import { BackgroundText } from "@/components/BackgroundText";
import { BackgroundCentered } from "@/components/BackgroundCentered";
import { Tasklist } from "@/types/tasklist";

export default function Tasklists() {
    const data = useContext(DataContext)
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const listRef = useRef<FlatList>(null)
    const configuration = Configuration(data.settings.isPro)

    const renderItem = useCallback(({item} : {item:Tasklist}) => (
        <TaskSettingsPanel tasklist={item} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerTitle: 'Settings' }} />

            <Animated.FlatList
                ref={listRef}
                keyboardShouldPersistTaps={'handled'}
                skipEnteringExitingAnimations={true}
                itemLayoutAnimation={LinearTransition.duration(200)}
                data={data.tasklists.slice(0, configuration.maxTasklists)}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={<NotificationPermissionBanner />}
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
                ListEmptyComponent={
                    <BackgroundCentered>
                        <AddTasklistBtn listRef={listRef} size={32} />
                        <BackgroundText>Add a TODOit list to get started</BackgroundText>
                    </BackgroundCentered>
                }
                removeClippedSubviews={false}
            />

            <View style={styles.floatingBottom}>
                <Undo />
                <AddTasklistBtn listRef={listRef} size={72} />
            </View>

        </SafeAreaView>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundSecondary,
        flex: 1
    },
    listContainer: {
        gap: 15,
        paddingBottom: 100,
        flexGrow: 1
    },
    floatingBottom: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
        gap: 15
    },
    link: {
        color: theme.primary
    }
})