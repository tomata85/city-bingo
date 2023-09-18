import React, { type ReactElement, useState, useEffect, useMemo } from 'react'
import '../styles.css'
import {
  getShowInstructionsStorage,
  storeShowInstructions
} from '../../io/local-storage'
import { initializeBoard, updateBoard } from '../../logic/board'
import { BoardInstanceItemType, BoardInstanceType, User } from '../../types'
import { updateBoardInstanceInDB } from '../../io/aws-lambdas'
import { useTranslation } from 'react-i18next'
import ItemPagesContainer from '../item-pages/ItemPagesContainer'
import InformationBox from '../infrastructure/InformationBox'
import Board from './Board'
import { Typography } from '@mui/material'
import { getHowToPlayInstructions, getItemDescriptions } from '../../io/description-files'
import Loading from '../infrastructure/Loading'

export default function BoardPage (props: {
  user: User
  destinationId: string
}): ReactElement {
  const { t, i18n } = useTranslation()
  const { user, destinationId } = props
  const [loading, setLoading] = useState(true)
  const boardItemDescriptions = useMemo(() => {
    return getItemDescriptions(i18n.language)
  }, [])
  const [showInstructions, setShowInstructions] = useState<boolean>(true)
  const [selectedItem, setSelectedItem] =
    useState<BoardInstanceItemType | null>(null)
  // TODO: is this initilazation a gross hack?
  const [board, setBoard] = useState<BoardInstanceType>({})
  const [howToPlay, setHowToPlay] = useState<string>('')

  useEffect(() => {
    const initialize = async () => {
      const board = await initializeBoard(user.id, destinationId)
      const showInstructions = getShowInstructionsStorage(user.id)
      if (showInstructions) {
        const howToPlay = await getHowToPlayInstructions(i18n.language)
        setHowToPlay(howToPlay)
      }
      setBoard(board)
      setShowInstructions(showInstructions)
      setLoading(false)
    }

    void initialize()
  }, [])

  const hideShowInstructions = () => {
    setShowInstructions(false)
    storeShowInstructions(user.id, false)
  }

  const onClickItem = (item: BoardInstanceItemType): void => {
    setSelectedItem(item)
  }

  const onItemPagesClosed = (updatedItem: BoardInstanceItemType): void => {
    const updatedBoard = updateBoard(board, updatedItem)
    setBoard(updatedBoard)
    void updateBoardInstanceInDB(user.id, updatedBoard)

    setSelectedItem(null)

    if (showInstructions) {
      hideShowInstructions()
    }
  }

  return (
    <>
      {selectedItem != null
        ? (
        <ItemPagesContainer
          item={selectedItem}
          description={boardItemDescriptions[selectedItem.id]}
          onClose={onItemPagesClosed}
        />
          )
        : (
        <>
          <Typography sx={{ mt: '30px', mb: '15px' }} variant="h3">
            {t('main_title')}
          </Typography>
          {/* <img className="cover-image" src="bansko-title.jpg"/> */}
          {loading
            ? <Loading />
            : <>
              <Board user={user} board={board} onClickItem={onClickItem}/>
              {showInstructions && (
                <InformationBox
                title={t('how_to_play_title')}
                  text={howToPlay}
                  onClose={() => {
                    hideShowInstructions()
                  }}
                />
              )}
            </>
              }
        </>
          )}
    </>
  )
}
