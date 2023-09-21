import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useEffect, useState } from 'react'
import { getMarkdownText } from '../../io/description-files'
import ReactMarkdown from 'markdown-to-jsx'
import { useTranslation } from 'react-i18next'

export function MenuPage (props: { pageName: string }): ReactElement {
  const [about, setAbout] = useState('')
  const { pageName } = props
  const { t } = useTranslation()

  useEffect(() => {
    const initialize = async () => {
      const about = await getMarkdownText(pageName, 'en')
      setAbout(about)

      // setLoading(false)
    }

    void initialize()
  }, [])

  const options = {
    overrides: {
      p: {
        component: Typography,
        props: { paragraph: true, variant: 'body2' }
      },
      a: {
        props: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }
    }
  }

  return (
    <Box sx={{ mt: '80px', mb: '15px' }}>
      <Typography display="inline" variant="h3">
        {t(`menu_page_${pageName}`)}
      </Typography>
      <Box>
        <ReactMarkdown options={options}>{about}</ReactMarkdown>
      </Box>
    </Box>
  )
}
