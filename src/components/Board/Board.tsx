import React, { ReactElement, useEffect } from 'react'
import BoardItem from './BoardItem'
import { BINGO_SIZE, BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { storeBoard } from '../../io/local-storage'
import { Box, Grid } from '@mui/material'

export default function BoardPage (props: {
  user: User
  board: BoardInstanceType
  onClickItem: (item: BoardInstanceItemType) => void
}): ReactElement {
  const BOARD_SIZE = 12 / BINGO_SIZE
  const { user, board, onClickItem } = props

  // TODO WIN
  // const [isWin, setIsWin] = useState<boolean>(false)

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      storeBoard(user.id, board)
    }
  }, [board])

  return (
    <>
      {Object.keys(board).length > 0 && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0.5}>
            {Object.values(board)
              .sort((x, y) => x.orderIndex - y.orderIndex)
              .map((item: BoardInstanceItemType) => (
                <Grid item xs={BOARD_SIZE} key={item.id}>
                  <BoardItem
                    key={item.id}
                    item={item}
                    onClick={(itemId: string) => {
                      onClickItem(item)
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </>
  )
}
