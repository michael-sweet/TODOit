import { Theme } from '@/types/theme';
import { StyleSheet } from 'react-native';

export const LIGHT_THEME = {
    primary: '#4A90E2',
    text: '#3C3C3C',
    textInverted: '#FFFFFF',
    textDisabled: '#808080',
    background: '#FFFFFF',
    backgroundSecondary: '#E1E1E1',
    backgroundModal: '#FFFFFF',
    danger: '#D0021B',
    warning: '#F5A623',
    success: '#7ED321',
    fontPrimary: 'Roboto-Regular',
    fontPrimaryBold: 'Roboto-Bold',
    fontSecondary: 'Poppins-Regular'
}

export const DARK_THEME = {
    ...LIGHT_THEME,
    text: "#E5E5E5",
    textDisabled: "#7e7e7e",
    background: "#121212",
    backgroundSecondary: "#1E1E1E",
    backgroundModal: "#1E1E1E",
    danger: '#FF5C5C',
    warning: '#F8C44C',
    success: '#8CE563'
}

export const DEFAULT_STYLES = (THEME: Theme) => StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: THEME.fontPrimary,
        color: THEME.text
    },
    container: {
        backgroundColor: THEME.backgroundSecondary,
        flex: 1
    },
    editable: {
        borderBottomColor: THEME.primary,
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    notificationSelectText: {
        fontFamily: THEME.fontSecondary,
        color: THEME.text,
        fontSize: 16,
        minWidth: 50,
        textAlign: 'center'
    }
});

export function createNavStyles(theme:Theme, isDarkTheme:boolean) : ReactNavigation.Theme {
    return {
        dark: isDarkTheme,
        colors: {
            primary: theme.primary,
            background: theme.background,
            card: theme.background,
            text: theme.text,
            border: theme.backgroundSecondary,
            notification: theme.backgroundSecondary
        },
        fonts: {
            regular: {
                fontFamily: 'Roboto-Regular',
                fontWeight: '400'
            },
            medium: {
                fontFamily: 'Roboto-Regular',
                fontWeight: '500'
            },
            bold: {
                fontFamily: 'Roboto-Regular',
                fontWeight: '600'
            },
            heavy: {
                fontFamily: 'Roboto-Regular',
                fontWeight: '700'
            }
        }
    }
}