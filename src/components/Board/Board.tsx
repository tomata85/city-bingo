import React, { ReactElement, useEffect } from 'react'
import BoardItem from './BoardItem'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { storeBoard } from '../../io/local-storage'
import { Box, Grid } from '@mui/material'

export default function BoardPage (props: {
  user: User
  board: BoardInstanceType
  onClickItem: (item: BoardInstanceItemType) => void
}): ReactElement {
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
          <Grid container spacing={1}>
            {Object.values(board).toSorted().map((item, index) => (
              <Grid item xs={3} key={index}>
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
