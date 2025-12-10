import { PresentPaywall } from "@/api/paywall"
import IconBtn from "@/components/IconBtn"
import { Configuration } from "@/constants/data"
import { DataDispatchContext, DataContext } from "@/contexts/data"
import { Tasklist } from "@/types/tasklist"
import { useContext } from "react"

type params = {
    tasklist: Tasklist
}

const iconSize = 24
const iconPadding = 10

export default function AddNotificationBtn({ tasklist } : params) {
    const dataDispatch = useContext(DataDispatchContext)
    const data = useContext(DataContext)

    const addBtn = (
        <IconBtn
            name="add"
            size={iconSize}
            padding={iconPadding}
            onPress={() => dataDispatch({
                type: 'add_tasklist_notification',
                uuid: tasklist.uuid
            })}
        />
    )

    const paywallBtn =  (
        <IconBtn
            name='add-pro'
            size={iconSize}
            padding={iconPadding}
            onPress={() => PresentPaywall(dataDispatch)} />
    )

    const isPro = data.settings.isPro
    const freeLimitReached = tasklist.notificationTriggers.length >= Configuration(false).maxNotifications
    const proLimitReached = tasklist.notificationTriggers.length >= Configuration(true).maxNotifications

    if (proLimitReached) {
        return null
    }

    if (!isPro && freeLimitReached) {
        return paywallBtn
    }

    return addBtn
}