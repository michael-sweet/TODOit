import React, { useContext, useMemo, useRef, useState } from "react"
import { StyleSheet, Text, TextInput as TextInputBase, ModalProps, TouchableOpacity } from "react-native"
import Modal from "../../Modal"
import { CustomThemeContext } from "@/constants/data"
import { Theme } from "@/types/theme"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TextInput from "@/components/TextInput"

type props = ModalProps  & {
    initialTitle: string
    onSubmit: (title: string) => void
}

export default function EditTitle({initialTitle: title, onSubmit, ...props} : props) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])
    const [inputValue, setInputValue] = useState(title)
    const [modalOpen, setModalOpen] = useState(false)
    const textInput = useRef<TextInputBase>(null)

    return (
        <>
            <TouchableOpacity onPress={() => setModalOpen(true)} style={styles.button}>
                <MaterialIcons name='label' size={18} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>

            <Modal
                {...props}
                transparent={true}
                visible={modalOpen}
                buttons={[
                    {
                        label: 'Cancel',
                        action: () => setModalOpen(false)
                    }, {
                        label: 'OK',
                        action: () => {
                            onSubmit(inputValue)
                            setModalOpen(false)
                        }
                    }
                ]}
                onShow={() => setTimeout(() => textInput.current?.focus(), 100)}
                onRequestClose={() => setModalOpen(false)}
                headerTitle='Label'
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
    button: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        overflow: 'hidden',
        alignSelf: 'flex-start'
    },
    buttonIcon: {
        width: 30,
        color: theme.textDisabled,
        textAlign: 'right'
    },
    buttonText: {
        fontFamily: theme.fontSecondary,
        color: theme.text,
        fontSize: 18
    }
})