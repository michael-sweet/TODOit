import React, { RefObject, useContext, useMemo, useRef, useState } from "react"
import { StyleSheet, View, TextInput as TextInputBase, FlatList } from "react-native"
import Modal from "../../Modal"
import { Configuration, CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"
import { SetUndoContext } from "@/contexts/undo"
import { DataContext, DataDispatchContext } from "@/contexts/data"
import IconBtn from "@/components/IconBtn"
import { PresentPaywall } from "@/api/paywall"
import { DefaultTasklist } from "@/types/tasklist"
import TextInput from "@/components/TextInput"

type params = {
    listRef?:RefObject<FlatList>
    size:number
}

export default function AddTasklistBtn({ listRef, size } : params) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const [inputValue, setInputValue] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const textInput = useRef<TextInputBase>(null)
    const dataDispatch = useContext(DataDispatchContext)
    const data = useContext(DataContext)
    const setUndo = useContext(SetUndoContext)

    const onSubmit = () => {
        dataDispatch({
            type: 'add_tasklist',
            tasklist: {
                ...DefaultTasklist(),
                title: inputValue
            }
        })
        setUndo(null)
        setInputValue("")
        setModalOpen(false)
        setTimeout(() => {
            listRef?.current?.scrollToEnd()
        }, 100);
    }

    const addBtn =  (
        <IconBtn name='add' size={size} onPress={() => setModalOpen(true)} style={styles.shadow} />
    )

    const paywallBtn =  (
        <IconBtn name='add-pro' size={size} onPress={() => PresentPaywall(dataDispatch)} style={styles.shadow} />
    )

    const isPro = data.settings.isPro
    const freeLimitReached = data.tasklists.length >= Configuration(false).maxTasklists
    const proLimitReached = data.tasklists.length >= Configuration(true).maxTasklists

    if (proLimitReached) {
        return null
    }

    return (
        <>
            <View style={styles.addTasklistContainer}>
                {!isPro && freeLimitReached ? paywallBtn : addBtn}
            </View>

            <Modal
                transparent={true}
                visible={modalOpen}
                buttons={[
                    {
                        label: 'Cancel',
                        action: () => setModalOpen(false)
                    }, {
                        label: 'OK',
                        action: onSubmit
                    }
                ]}
                onShow={() => setTimeout(() => textInput.current?.focus(), 100)}
                onRequestClose={() => setModalOpen(false)}
                headerTitle="Label"
                fillWidth={true}
            >
                <TextInput
                    textInputRef={textInput}
                    value={inputValue}
                    onChangeText={setInputValue}
                    maxLength={30}
                />
            </Modal>
        </>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    addTasklistContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    shadow: {
        elevation: 5
    }
})