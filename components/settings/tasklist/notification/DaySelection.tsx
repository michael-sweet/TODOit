import DaySelect from '@/components/DaySelect';
import { CustomThemeContext } from '@/constants/data';
import { DEFAULT_STYLES } from '@/constants/styles';
import { useContext, useMemo } from 'react';

type props = {
    day?: number,
    onValueChange:(day:number) => void
}
export default function NotificationTriggerDaySelection({day = 1, onValueChange} : props) {
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    return (
        <DaySelect
            onValueChange={onValueChange}
            selectedValue={day}
            style={defaultStyles.editable}
            textStyle={defaultStyles.notificationSelectText}
        />
    )
}