import { Action } from "@/types/data";
import { Settings } from "@/types/settings";

export function SettingsReducer(settings:Settings, action:Action) : Settings {
    switch (action.type) {
        case 'set_is_pro':
            return {
                ...settings,
                isPro: action.value
            }
    }

    return settings
}