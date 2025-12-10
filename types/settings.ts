export type Settings = {
    isPro: boolean
}

export type SettingsAction =
    | SetIsPro

type SetIsPro = {
    'type': 'set_is_pro',
    value: boolean
}