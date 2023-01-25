import { BANSKO_BOARD_ITEMS, UserBoardType } from './types'

export function getUserBoard(_: {userId: string, destinationId: string}): UserBoardType {
    const board : UserBoardType = {};
    Object.entries(BANSKO_BOARD_ITEMS).forEach((item) => { 
        board[item[0]] = { 
            id: item[0],
            text: item[1],
            checked: false };
    });

    return board;
}