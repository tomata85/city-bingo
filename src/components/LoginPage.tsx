import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState, type ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '../types'
import {
  getLoggedInUserFromStorage,
  storeLoggedInUser
} from '../io/local-storage'
import Loading from './infrastructure/Loading'
import { isEmailValid } from '../logic/personal-details'

export interface LoginPageProps {
  onLogin: (user: User) => void
}
export default function LoginPage (props: LoginPageProps): ReactElement {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameValid, setNameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = getLoggedInUserFromStorage()

    if (storedUser !== undefined) {
      props.onLogin(storedUser)
    } else {
      setLoading(false)
    }
  }, [])

  const onLogin = () => {
    const nameValid = name.length > 0
    const emailValid = isEmailValid(email)
    setNameValid(nameValid)
    setEmailValid(emailValid)

    if (nameValid && emailValid) {
      const user = { name, id: email }
      storeLoggedInUser(user)
      props.onLogin(user)
    }
  }

  return (
    <>
      {loading
        ? (
        <Loading />
          )
        : (
        <>
         <Typography
            variant="h2"
            component="div"
            textAlign="center"
            sx={{ mt: '120px' }} >
            {t('logo')}
          </Typography>
          <Typography variant="h6" component="div" textAlign="center">
            {t('slogan')}
          </Typography>

          <Box sx={{ mt: '15px', textAlign: 'left' }}>
            <TextField
              sx={{
                width: '100%'
              }}
              id="outlined-basic"
              label={t('login_name')}
              required
              error={!nameValid}
              color="secondary"
              onChange={(event: any) => {
                setName(event.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onLogin()
                }
              }}
            />
            <TextField
              sx={{
                width: '100%',
                mt: '15px'
              }}
              id="outlined-basic"
              label={t('login_email')}
              error={!emailValid}
              color="secondary"
              required
              type="email"
              onChange={(event: any) => {
                setEmail(event.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onLogin()
                }
              }}
            />
          </Box>
          <Box display="flex" justifyContent="center" sx={{ mt: '45px' }}>
            <Button
              variant="contained"
              onClick={onLogin}
              size="large"
              sx={{ width: '100%' }}
              type="submit"
            >
              {t('login_save')}
            </Button>
          </Box>
        </>
          )}
    </>
  )
}
