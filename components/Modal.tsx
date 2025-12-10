import { CustomThemeContext } from "@/constants/data";
import { Theme } from "@/types/theme";
import { useContext, useMemo } from "react";
import { ModalProps, Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type buttonProp = {
    label: string,
    action: () => void
}
type props = ModalProps & {
    buttons?: buttonProp[],
    headerTitle?: string,
    fillWidth?: boolean
}

export default function CustomModal({buttons, headerTitle: headerText, fillWidth = false, children, ...props} : props) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME), [THEME])

    function renderButton(button:buttonProp, i:number) {
        return (
            <TouchableOpacity key={i} onPress={button.action}>
                <Text style={styles.button}>{button.label}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal {...props} animationType='fade'>
            <View style={styles.container}>
                <View style={[styles.innerContainer, fillWidth ? styles.fillWidth : {}]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{headerText}</Text>
                    </View>
                    <View style={styles.content}>
                        {children}
                    </View>
                    <View style={styles.footer}>
                        {buttons?.map(renderButton)}
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    fillWidth: {
        flex: 1,
        maxWidth: 450,
    },
    innerContainer: {
        backgroundColor: theme.backgroundModal,
        margin: 15,
        borderRadius: 5,
        padding: 10
    },
    header: {
        padding: 10
    },
    headerText: {
        color: theme.text
    },
    content: {
        padding: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        color: theme.primary,
        padding: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})