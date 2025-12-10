import { Settings, SettingsAction } from "./settings"
import { Tasklist, TasklistAction } from "./tasklist"

export type Data = {
    tasklists: Tasklist[],
    settings: Settings
}

type setData = {
    type: 'set_data',
    data: Data
}

export type Action =
    | setData
    | TasklistAction
    | SettingsAction