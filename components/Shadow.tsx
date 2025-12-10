import { CustomThemeContext } from "@/constants/data";
import { useContext } from "react";
import { Shadow, ShadowProps } from "react-native-shadow-2";

export function ScrollViewBottom(props:ShadowProps) {
    const THEME = useContext(CustomThemeContext)
    return (
        <Shadow
            sides={{start: false, end: false, bottom: false}}
            corners={{topStart: false, topEnd: false, bottomStart: false, bottomEnd: false}}
            stretch={true}
            startColor={THEME.backgroundSecondary}
            distance={80}
            {...props} />
    )
}