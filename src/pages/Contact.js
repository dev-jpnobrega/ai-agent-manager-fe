import React from 'react';
import { TextField, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import { useTranslation } from 'react-i18next';

import MainContainer from '../containers/Main';
import PageBase from './PageBase';

function Contact() {
  const [ t ] = useTranslation('translation');

  const handleFormSubmit = (event) => {
    console.warn('event', event);

    return event;
  }

  return (
    <MainContainer>
      <PageBase>
        <Typography variant="h4" color="textSecondary" component="h4">
        { t('contact.page.title') }
        </Typography>
        <Typography variant="p" color="textSecondary" component="p">
        { t('contact.page.title.description') }
        </Typography>
        <br/>
        <section>
          <form autoComplete="off" onSubmit={ handleFormSubmit }>
            <TextField
              name={ t('contact.page.name') }
              label={ t('contact.page.label') }
              fullWidth
              autoComplete="none"
            />

            <TextField
              name={ t('contact.page.email') }
              label={ t('contact.page.email.label') }
              fullWidth
              autoComplete="none"
            />

            <TextField
              name={ t('contact.page.message') }
              label={ t('contact.page.message.label') }
              fullWidth
              multiline={true}
              rows={10}
              autoComplete="none"
            />

            <br/> <br/> <br/>

            <Button aria-label={ t('contact.page.button.submit') } variant="outlined" color="secondary">
              { t('contact.page.button.submit') }
            </Button>
          </form>
        </section>
      </PageBase>      
    </MainContainer>
  )
}

export default Contact;