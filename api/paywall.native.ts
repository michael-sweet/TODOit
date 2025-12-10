import RevenueCatUI from 'react-native-purchases-ui';
import { Action } from '@/types/data';
import Purchases from 'react-native-purchases';

export function PresentPaywall(dataDispatch:React.Dispatch<Action>) {
    RevenueCatUI.presentPaywall().then(() => {
        UpdateProStatus(dataDispatch)
    })
}

export async function UpdateProStatus(dataDispatch:React.Dispatch<Action>) {
    try {
        const customerInfo = await Purchases.getCustomerInfo();
        const isPro = typeof customerInfo.entitlements.active['Pro'] !== "undefined"
        dataDispatch({
            type: 'set_is_pro',
            value: isPro
        })
    } catch (e) {
        console.log('Unable to check pro status')
    }
}