import { Box, TextField } from '@mui/material'
import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import FooterPane from './Infrastructure/FooterPane'
import FooterPaneButton from './Infrastructure/FooterPaneButton'
import { User } from '../types'
import {
  getLoggedInUserFromStorage,
  storeLoggedInUser
} from '../io/local-storage'
import Loading from './Infrastructure/Loading'

export interface LoginPageProps {
  onLogin: (user: User) => void
}
export default function LoginPage (props: LoginPageProps): ReactElement {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = getLoggedInUserFromStorage()

    if (storedUser !== undefined) {
      props.onLogin(storedUser)
    } else {
      setLoading(false)
    }
  }, [])

  const onLoginClick = () => {
    const user = { name, id: email }
    storeLoggedInUser(user)
    props.onLogin(user)
  }

  return (
    <>
    { loading
      ? <Loading />
      : <>
      <Box sx={{ textAlign: 'left' }}>
        <h3>{t('login_name')}</h3>
        <TextField
          sx={{
            width: '100%'
          }}
          id="outlined-basic"
          label={t('login_name')}
          onChange={(event: any) => {
            setName(event.target.value)
          }}
        />
        <h3>{t('login_email')}</h3>
        <TextField
          sx={{
            width: '100%'
          }}
          id="outlined-basic"
          label={t('login_email')}
          onChange={(event: any) => {
            setEmail(event.target.value)
          }}
        />
      </Box>
      <FooterPane>
        <FooterPaneButton text={t('login_save')} onClick={onLoginClick} />
      </FooterPane>
    </>} </>
  )
}
