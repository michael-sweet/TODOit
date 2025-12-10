import { router, Stack } from "expo-router";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Configuration, CustomThemeContext } from "@/constants/data";
import Tasklist from "@/components/Tasklist";
import { useContext, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from '@/types/theme';
import * as Shadow from '@/components/Shadow';
import { TabView, TabBar, TabBarItem, TabBarProps, TabBarItemProps, Route } from 'react-native-tab-view';
import AddTaskInput from "@/components/AddTaskInput";
import React from "react";
import { DataContext } from "@/contexts/data";
import { BackgroundText } from "@/components/BackgroundText";
import { BackgroundCentered } from "@/components/BackgroundCentered";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default function App() {
    const data = useContext(DataContext)
    const [tabIndex, setTabIndex] = useState(0);
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const tasklistRefs = useRef<{[key: string] : FlatList}>({})
    const configuration = Configuration(data.settings.isPro)

    if (data.tasklists.length && !data.tasklists[tabIndex]) {
        setTabIndex(data.tasklists.length - 1)
    }

    const renderTabBar = (props: TabBarProps<Route>) => (
        <TabBar
            {...props}
            renderTabBarItem={renderTabBarItem}
            indicatorStyle={styles.tabBarIndicator}
            style={styles.tabBar}
            activeColor={THEME.text}
            inactiveColor={THEME.textDisabled}
            scrollEnabled={true}
            tabStyle={styles.tabBarItem}
        />
    );

    const renderTabBarItem = ({key, ...props}: TabBarItemProps<Route> & { key: string }) => (
        <TabBarItem
            key={key}
            {...props}
            labelStyle={styles.tabBarItemLabel}
        />
    )

    const routes = data.tasklists.slice(0, configuration.maxTasklists).map((tasklist) => ({
        key: tasklist.uuid,
        title: tasklist.title
    }))

    const renderScene = ({route} : {route:Route}) => {
        return <Tasklist uuid={route.key} flatlistRef={(ref) => {if (ref) {tasklistRefs.current[route.key] = ref}}} />
    }

    const onTaskAdded = () => {
        setTimeout(() => {
            tasklistRefs.current[data.tasklists[tabIndex].uuid].scrollToEnd()
        }, 100)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerRight: () =>
                        <TouchableOpacity onPressIn={() => router.navigate('/settings/tasklists')}>
                            <MaterialIcons name="settings" size={24} style={styles.headerIcon} />
                        </TouchableOpacity>
                }}
            />

            {data.tasklists.length > 0 &&
                <>
                    <TabView
                        navigationState={{ index: tabIndex, routes }}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setTabIndex}
                        initialLayout={initialLayout}
                    />

                    <Shadow.ScrollViewBottom>
                        <AddTaskInput tasklist={data.tasklists[tabIndex]} onTaskAdded={onTaskAdded} />
                    </Shadow.ScrollViewBottom>
                </>
            }

            {!data.tasklists.length &&
                <BackgroundCentered>
                    <BackgroundText>Add a TODOit list in</BackgroundText>
                    <TouchableOpacity onPress={() => router.navigate('/settings/tasklists')}>
                        <View style={styles.linkContainer}>
                            <Text style={styles.link}>settings</Text>
                            <MaterialIcons name="settings" style={styles.link} />
                        </View>
                    </TouchableOpacity>
                </BackgroundCentered>
            }

        </SafeAreaView>
    );
}

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundSecondary,
        flex: 1
    },
    headerIcon: {
        padding: 15,
        color: theme.text
    },
    tabBar: {
        backgroundColor: theme.background
    },
    tabBarIndicator: {
        backgroundColor: theme.primary
    },
    tabBarItemLabel: {
        fontFamily: theme.fontSecondary,
        margin: 0
    },
    tabBarItem: {
        width: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    link: {
        color: theme.primary
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})