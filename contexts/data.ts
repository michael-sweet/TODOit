import { DefaultData } from '@/constants/defaultData';
import { Action, Data } from '@/types/data';
import { createContext, Dispatch } from 'react';
import { TasklistReducer } from './tasklists';
import { SettingsReducer } from './settings';

export const DataContext = createContext<Data>(DefaultData)
export const DataDispatchContext = createContext<Dispatch<Action>>(() => {})

export function DataReducer(data:Data, action:Action) : Data {
    if (action.type == 'set_data') {
        return {...action.data}
    }

    return {
        tasklists: TasklistReducer(data.tasklists, action),
        settings: SettingsReducer(data.settings, action)
    }
}