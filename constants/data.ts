import { createContext } from "react";
import { LIGHT_THEME } from "./styles";

export const CustomThemeContext = createContext(LIGHT_THEME)

export const Configuration = (isPro:boolean) => isPro ? proConfiguration : freeConfiguration

type configuration = {
    maxNotifications: number,
    maxTasklists: number
}

const freeConfiguration:configuration = {
    maxNotifications: 1,
    maxTasklists: 3
}

const proConfiguration:configuration = {
    maxNotifications: 10,
    maxTasklists: 10
}