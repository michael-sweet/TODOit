import { CustomThemeContext } from "@/constants/data";
import { Theme } from "@/types/theme";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native";

type icon =
    | 'add'
    | 'add-pro'

type params = TouchableHighlightProps & {
    name: icon
    size: number
    padding?: number
}

export default function IconBtn({ name, size, padding = 0, ...params } : params) {
    const THEME = useContext(CustomThemeContext)
    const styles = useMemo(() => createStyles(THEME, size, padding), [THEME])

    function renderIcon(name:icon) {
        switch (name) {
            case 'add-pro':
                return <>
                    <MaterialIcons name='add' style={styles.icon} />
                    <Text style={styles.proText}>
                        <MaterialIcons name='lock' style={styles.proIcon} />
                    </Text>
                </>

            default:
                return <MaterialIcons name={name} style={styles.icon} />
        }
    }

    return (
        <TouchableHighlight
            {...params}
            underlayColor={THEME.textInverted}
            style={[styles.container, params.style]}
        >
            <View style={styles.containerInner}>
                {renderIcon(name)}
            </View>
        </TouchableHighlight>
    )
}

const createStyles = (theme:Theme, size:number, padding:number) => StyleSheet.create({
    icon: {
        color: theme.textInverted,
        textAlign: 'center',
        fontSize: (size / 4) + 7
    },
    container: {
        borderRadius: size,
        padding: padding
    },
    containerInner: {
        justifyContent: 'center',
        backgroundColor: theme.primary,
        borderRadius: size,
        height: size,
        width: size
    },
    proText: {
        fontSize: (size / 4),
        position: 'absolute',
        bottom: size * 0.55,
        left: size * 0.55,
        backgroundColor: theme.primary,
        borderRadius: size,
        padding: size / 12,
        color: theme.textInverted,
        fontFamily: theme.fontPrimary
    },
    proIcon: {
        fontSize: (size / 4) + 2,
        color: theme.textInverted,
    }
})