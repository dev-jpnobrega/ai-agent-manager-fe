import React, { createContext, useRef, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DEFAULT_VALUE = {
  snackbarState: {
    title: '',
    severity: 'info',
  },
  setSnackbar: () => { }
}

export const SnackbarContext = createContext(DEFAULT_VALUE)

export const SnackbarProvider = ({ children }) => {
  const snackbarRef = useRef(null)
  const [snackbarState, setSnackbarState] = useState(DEFAULT_VALUE.snackbarState)

  const setSnackbar = (state) => {
    setSnackbarState({
      ...snackbarState,
      ...state,
      open: true
    })
  }

  return (
    <SnackbarContext.Provider value={{ snackbarState, setSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        onClose={() => { setSnackbarState({ open: false }) }}
        ref={snackbarRef}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
      >
        <Alert severity={snackbarState.severity}>
          {snackbarState.title}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
