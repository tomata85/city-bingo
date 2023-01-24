import { BANSKO_BOARD_ITEMS } from './types'

export type UserBoardItem = { Id: string,  }
export function generateUserBoard(data: {userId: string, destinationId: string}) {
    return BANSKO_BOARD_ITEMS;
}