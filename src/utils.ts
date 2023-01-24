import { BANSKO_BOARD_ITEMS, BoardItemType } from './types'

export function getUserBoard(_: {userId: string, destinationId: string}): BoardItemType[] {
    return Object.entries(BANSKO_BOARD_ITEMS).map((item) => { 
        return { 
            id: item[0],
            text: item[1],
            checked: false };  
    });
}