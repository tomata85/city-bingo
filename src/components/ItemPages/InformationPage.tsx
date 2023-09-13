import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { ItemPagesProps } from './ItemPagesContainer'
import ReactMarkdown from 'react-markdown'

export default function InformationPage (props: ItemPagesProps): ReactElement {
  const { item } = props
  const [description, SetDescription] = useState('')
  const { i18n } = useTranslation()

  useEffect(() => {
    const initalize = async () => {
      const res = await import(`../../i18n/descriptions/${i18n.language}/bansko/${item.id}.md`)
      const res2 = await fetch(res.default)
      const res3 = await res2.text()
      SetDescription(res3)
    }

    void initalize()
  }, [])

  return (
    <>
      <Box>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
    </>
  )
}
