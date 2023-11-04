import React, { useState } from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, FormGroup, Typography } from '@material-ui/core';

const ServicesStep = ({ handleAgentChange, newAgent }) => {
  const [checkBoxState, setCheckBoxState] = useState({
    ingestionEnable: false,
    apiEnable: false
  })

  const changeCheckBoxState = (event) => {
    console.log(event)
    setCheckBoxState({ ...checkBoxState, [event.target.name]: event.target.checked });
  }

  return (
    <>
      <Grid item xs={12} sm={12}>
        <FormGroup row style={{ justifyContent: 'center' }}>
          <FormControlLabel
            control={<Checkbox name="ingestionEnable" checked={checkBoxState.ingestionEnable} color="primary" onChange={(e) => changeCheckBoxState(e)} />}
            label="Ingestion Enable"
            style={{ color: 'black' }}
          />
          <FormControlLabel
            control={<Checkbox name="apiEnable" checked={checkBoxState.apiEnable} color="primary" onChange={(e) => changeCheckBoxState(e)} />}
            label="API Enable"
            style={{ color: 'black' }}
          />
        </FormGroup>
      </Grid>

      <Grid item xs={12} sm={6} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>Document Intelligent Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Endpoint</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Key</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      <Grid item xs={12} sm={6} style={{ marginTop: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='subtitle2' color='textSecondary'>Storage Settings</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>URI</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Key</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center"
              alignItems="center">
              <Grid item xs={4}>
                <Typography variant='body2'>Path</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  size="small"
                  style={{ width: '100%', maxWidth: '250px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ServicesStep;