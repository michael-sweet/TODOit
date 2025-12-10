import { DEFAULT_STYLES } from "@/constants/styles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useContext, useMemo, useState } from "react"
import { StyleProp, StyleSheet, Text, TextStyle, TouchableHighlightProps, TouchableOpacity, View } from "react-native"
import Modal from "./Modal"
import { CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"

export type OptionProp = {
    label: string,
    value: string
}

type props = TouchableHighlightProps  & {
    options: OptionProp[],
    selectedValue?: string,
    onValueChange: (value:string) => void,
    headerTitle?: string,
    textStyle?: StyleProp<TextStyle>,
    enabled?: boolean
}

export default function Select({options, selectedValue, onValueChange, headerTitle, textStyle, enabled = true, ...props} : props) {
    const [modalOpen, setModalOpen] = useState(false)
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    function onOptionSelected(value:string) {
        onValueChange(value)
        setModalOpen(false)
    }
    const selectedOption = useMemo(() => options.find(((option) => option.value == selectedValue)), [selectedValue])
    const renderItem = (option:OptionProp, i:number) => (
        <TouchableOpacity key={i} onPress={() => onOptionSelected(option.value)}>
            <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                <MaterialIcons
                    name={option == selectedOption ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={16}
                    style={{color: THEME.primary}}
                />
                <Text style={[defaultStyles.text, option == selectedOption ? styles.selected : {}]}>{option.label}</Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <>
            <Modal
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                buttons={[{
                    label: 'Cancel',
                    action: () => setModalOpen(false)
                }]}
                headerTitle={headerTitle}
            >
                <View style={styles.list}>
                    {options.map(renderItem)}
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalOpen(enabled)} {...props}>
                <Text style={textStyle ?? defaultStyles.text}>{selectedOption?.label}</Text>
            </TouchableOpacity>
        </>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    list: {
        gap: 15,
        paddingHorizontal: 15
    },
    selected: {
        fontFamily: theme.fontPrimaryBold
    }
})