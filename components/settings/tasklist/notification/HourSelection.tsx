import DateTimePicker from '@react-native-community/datetimepicker';
import { DEFAULT_STYLES } from '@/constants/styles';
import { Text, TouchableOpacity } from 'react-native';
import { useContext, useMemo, useState } from 'react';
import React from 'react';
import { Time } from './Trigger';
import { CustomThemeContext } from '@/constants/data';

function formatTime(time:Time) : string {
    return time.hour.toString().padStart(2, '0') + ':' + time.minute.toString().padStart(2, '0')
}

type props = {
    time?: Time,
    onValueChange:(time:Time) => void
}
export default function NotificationTriggerTimeSelection({time, onValueChange} : props) {
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    const [modalOpen, setModalOpen] = useState(false);
    const date = new Date()
    if (time) {
        date.setMinutes(time.minute)
        date.setHours(time.hour)
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalOpen(true)}
                style={defaultStyles.editable}
            >
                <Text style={defaultStyles.notificationSelectText}>{time ? formatTime(time) : '00:00'}</Text>
            </TouchableOpacity>
            {modalOpen && (
                <DateTimePicker
                    value={date}
                    mode='time'
                    display='spinner'
                    minuteInterval={15}
                    onChange={(e, date) => {
                        setModalOpen(false)
                        if (e.type == 'set' && date) {
                            onValueChange({hour: date.getHours(), minute: date.getMinutes()})
                        }
                    }}
                    positiveButton={{textColor: THEME.primary}}
                    negativeButton={{textColor: THEME.primary}}
                />
            )}
        </>
    )
}