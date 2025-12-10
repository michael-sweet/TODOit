import { DEFAULT_STYLES } from "@/constants/styles"
import React, { useContext, useMemo, useState } from "react"
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import Modal from "./Modal"
import { CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type props = TouchableOpacityProps  & {
    selectedValue?: number,
    onValueChange: (value:number) => void,
    textStyle?: StyleProp<TextStyle>,
    enabled?: boolean
}

const maxSafeDay = 28
const options = [...Array(31).keys()].map((i) => i + 1)

export default function DaySelect({selectedValue, onValueChange, textStyle, enabled = true, ...props} : props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selected, setSelected] = useState(selectedValue)
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    const styles = useMemo(() => createStyles(THEME), [THEME])

    const renderItem = (option:number, i:number) => (
        <TouchableOpacity key={i} onPress={() => setSelected(option)} style={styles.item}>
            <View style={[
                styles.itemContainer,
                selected == option ? option > maxSafeDay ? styles.itemContainerSelectedWarning : styles.itemContainerSelected : {},
            ]}>
                <Text style={[styles.text, selected == option ? styles.textSelected : {}]}>{option}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <>
            <Modal
                transparent={true}
                visible={modalOpen}
                onShow={() => setSelected(selectedValue)}
                onRequestClose={() => setModalOpen(!modalOpen)}
                headerTitle="Notify every month on:"
                buttons={[
                    {
                        label: 'Cancel',
                        action: () => setModalOpen(false)
                    },
                    {
                        label: 'Ok',
                        action: () => {
                            selected && onValueChange(selected)
                            setModalOpen(false)
                        }
                    }
                ]}
            >
                <View style={{gap: 15}}>
                    <View style={styles.grid}>
                        {options.map(renderItem)}
                    </View>
                    <View style={[styles.warningContainer, {opacity: selected && selected > maxSafeDay ? 1 : 0}]}>
                        <MaterialIcons name='warning' size={23} style={styles.warningIcon} />
                        <Text style={styles.warningText}>Some months will be skipped!</Text>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalOpen(enabled)} {...props}>
                <Text style={textStyle ?? defaultStyles.text}>{formatDay(selectedValue ?? 1)}</Text>
            </TouchableOpacity>
        </>
    )
}

function formatDay(day:number) : string {
    let str = day.toString()
    if (day > 3 && day < 21) {
        return str + "th"
    }
    switch (str.slice(-1)) {
        case "1":
            str += "st"
            break;
        case "2":
            str += "nd"
            break;
        case "3":
            str += "rd"
            break;
        default:
            str += "th"
            break;
    }

    return str
}

const createStyles = (theme: Theme) => StyleSheet.create({
    grid: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    item: {
        flexBasis: '20%',
        width: 10,
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 35,
        height: 35
    },
    itemContainerSelected: {
        backgroundColor: theme.primary
    },
    itemContainerSelectedWarning: {
        backgroundColor: theme.warning
    },
    text: {
        color: theme.text
    },
    textSelected: {
        color: theme.textInverted
    },
    warningContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    warningText: {
        fontFamily: theme.fontPrimary,
        color: theme.text
    },
    warningIcon: {
        color: theme.warning
    }
})