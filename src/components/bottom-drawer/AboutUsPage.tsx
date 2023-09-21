import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactElement, useEffect, useState } from 'react'
import { getAbout } from '../../io/description-files'
import ReactMarkdown from 'markdown-to-jsx'
export function AboutUsPage (): ReactElement {
  const [about, setAbout] = useState('')

  useEffect(() => {
    const initialize = async () => {
      const about = await getAbout('en')
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
        About Us
      </Typography>
      <Box>
        <ReactMarkdown options={options}>{about}</ReactMarkdown>
      </Box>
    </Box>
  )
}
