import React, { type ReactElement, useState, useEffect } from 'react'
import BoardItem from './BoardItem'
import '../styles.css'
import { getBoardFromStorage, storeBoard } from '../../logic/local-storage'
import { generateBoardInstance, isBoardWin } from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { getBoardFromDB, updateBoardInstance } from '../../logic/api'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../ItemPages/ItemPagesContainer'
import { Alert, AlertTitle, Box, Button } from '@mui/material'

export default function Board (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
  // TODO: is this initilazation a gross hack?
  const [board, setBoard] = useState<BoardInstanceType>({})
  const [isWin, setIsWin] = useState<boolean>(false)
  const [howToPlay, setHowToPlay] = useState<string>('')
  const { user, destinationId } = props

  useEffect(() => {
    const initalize = async () => {
      const res = await import('../../i18n/descriptions/en/how_to_play.md')
      const res2 = await fetch(res.default)
      const howToPlay = await res2.text()
      setHowToPlay(howToPlay)
    }

    void initalize()
  }, [])

  useEffect(() => {
    const initialize = async () => {
      const board =
        getBoardFromStorage(user.id) ??
        (await getBoardFromDB(user.id)) ??
        generateBoardInstance(user.id, destinationId)
      setBoard(board)
    }

    void initialize()
  }, [])

  useEffect(() => {
    if (Object.keys(board).length > 0) {
      storeBoard(user.id, board)
      setIsWin(isBoardWin(board))
    }
  }, [board])

  const onClickItem = (itemId: string): void => {
    setSelectedItem(board[itemId])
  }

  const onItemPagesClosed = (done: boolean, imageUrl?: string): void => {
    if (selectedItem != null && done) {
      const updatedBoard = {
        ...board,
        [selectedItem.id]: {
          ...board[selectedItem.id],
          checked: true,
          imageUrl
        }
      }

      setBoard(updatedBoard)
      updateBoardInstance(user.id, updatedBoard)
    }

    setSelectedItem(null)
  }

  return (
    <>
      {selectedItem != null
        ? (
        <ItemPagesContainer item={selectedItem} onClose={onItemPagesClosed} />
          )
        : (
        <>
          <p>{t(`Hi, ${user.name}`)}</p>
          <h1 className="title">{t('main_title')}</h1>
          <div className="board-container">
            {Object.values(board).map((item) => (
              <BoardItem key={item.id} item={item} onClick={onClickItem} />
            ))}
            <div>{isWin ? 'Yay you win!' : ''}</div>
          </div>
          <Box sx={{ margin: '30px', textAlign: 'left' }}>
            <Alert severity="info">
              <AlertTitle>How to play?</AlertTitle>
              {howToPlay}
              <Box display="flex" justifyContent="flex-end">
              <Button color="inherit" size="small">
                  Got It
              </Button>
              </Box>
            </Alert>
          </Box>
        </>
          )}
    </>
  )
}
