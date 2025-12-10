import { FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import TaskElement from './TaskElement';
import { Ref, useContext, useMemo } from 'react';
import { DataContext } from '@/contexts/data';
import { Theme } from '@/types/theme';
import { CustomThemeContext } from '@/constants/data';
import { NoItems } from '@/constants/phrases';
import { BackgroundText } from './BackgroundText';
import { BackgroundCentered } from './BackgroundCentered';

export default function Tasklist({ uuid, flatlistRef } : { uuid: string, flatlistRef?: Ref<FlatList> }) {
    const data = useContext(DataContext)
    const tasklist = useMemo(() => data.tasklists.find((tasklist) => tasklist.uuid == uuid), [data, uuid])
    const tasklistIndex = useMemo(() => data.tasklists.findIndex((tasklist) => tasklist.uuid == uuid), [data, uuid])
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])

    if (!tasklist) {
        return
    }

    return (
        <Animated.FlatList
            ref={flatlistRef}
            itemLayoutAnimation={LinearTransition.duration(200)}
            skipEnteringExitingAnimations={true}
            keyExtractor={(item) => item.uuid}
            data={tasklist.tasks}
            renderItem={({item}) => <TaskElement task={item} key={item.uuid} />}
            ListFooterComponent={<View></View>}
            ListFooterComponentStyle={{minHeight: 125}}
            ListEmptyComponent={
                <BackgroundCentered>
                    <BackgroundText>{NoItems(tasklistIndex)}</BackgroundText>
                </BackgroundCentered>
            }
            contentContainerStyle={styles.list}
        />
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    list: {
        flexGrow: 1
    }
})