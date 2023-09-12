import React, { ReactElement, useEffect } from 'react'
import BoardItem from './BoardItem'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { storeBoard } from '../../logic/local-storage'

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
    <div className="board-container">
      {Object.values(board).map((item) => (
        <BoardItem
          key={item.id}
          item={item}
          onClick={(itemId: string) => {
            onClickItem(board[itemId])
          }}
        />
      ))}
    </div>
  )
}
