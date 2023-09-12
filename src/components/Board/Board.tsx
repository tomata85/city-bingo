import React, { ReactElement, useEffect } from 'react'
import BoardItem from './BoardItem'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { storeBoard } from '../../logic/local-storage'
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

  const FormRow = (props: { item: BoardInstanceItemType }) => {
    const { item } = props
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <BoardItem
            key={0}
            item={item}
            onClick={(itemId: string) => {
              onClickItem(item)
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <BoardItem
            key={1}
            item={item}
            onClick={(itemId: string) => {
              onClickItem(item)
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <BoardItem
            key={2}
            item={item}
            onClick={(itemId: string) => {
              onClickItem(item)
            }}
          />
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <>
      {Object.keys(board).length > 0 && (
        <Box sx={{ margin: '30px', flexGrow: 1 }}>
          <Grid container spacing={1}>
            {Object.values(board).map((item, index) => (
              <Grid item xs={4} key={index}>
                <BoardItem
                  key={2}
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
