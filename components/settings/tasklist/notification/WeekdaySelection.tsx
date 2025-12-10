import Select from "@/components/Select"
import { CustomThemeContext } from "@/constants/data"
import { DEFAULT_STYLES } from "@/constants/styles"
import { useContext, useMemo } from "react"

const options = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
].map((option, i) => {
    return {
        label: option,
        value: '' + (i + 1)
    }
})

type props = {
    day?: number,
    onValueChange:(day:number) => void
}
export default function NotificationTriggerWeekdaySelection({day = 1, onValueChange} : props) {
    const THEME = useContext(CustomThemeContext)
    const defaultStyles = useMemo(() => DEFAULT_STYLES(THEME), [THEME])
    return (
        <Select
            options={options}
            onValueChange={(value) => onValueChange(parseInt(value))}
            selectedValue={'' + day}
            style={defaultStyles.editable}
            textStyle={defaultStyles.notificationSelectText}
            headerTitle="Notify every week on:"
        />
    )
}
