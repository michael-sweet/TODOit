import { SchedulableTriggerInputTypes } from 'expo-notifications';
import Select from '@/components/Select';
import { DEFAULT_STYLES } from '@/constants/styles';
import { CustomThemeContext } from '@/constants/data';
import { useContext, useMemo } from 'react';

const options = [
    {
        label: 'Day',
        value: SchedulableTriggerInputTypes.DAILY
    },
    {
        label: 'Week',
        value: SchedulableTriggerInputTypes.WEEKLY
    },
    {
        label: 'Month',
        value: SchedulableTriggerInputTypes.MONTHLY
    }
]

type props = {
    type?: string,
    onValueChange:(type:SchedulableTriggerInputTypes) => void
}
export default function NotificationTriggerTypeSelection({type = SchedulableTriggerInputTypes.DAILY, onValueChange} : props) {
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    return (
        <Select
            options={options}
            onValueChange={(value) => onValueChange(value as SchedulableTriggerInputTypes)}
            selectedValue={type}
            style={defaultStyles.editable}
            textStyle={defaultStyles.notificationSelectText}
            headerTitle="Notify every:"
        />
    )
}

