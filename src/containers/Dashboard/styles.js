import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 30px',
    maxWidth: '1200px',
    heigth: '100%',
  }, 
  paper: { 
    padding: '24px 20px', letterSpacing: '0.5px', fontWeight: '500', width: '100%',
    boxShadow: 'rgba(58, 53, 65, 0.1) 0px 2px 10px 0px'
  },
  playoundSubtitle: { color: '#3a3541', lineHeight: '21px', letterSpacing: '0.25px', opacity: '0.60' },
  playgroundActions: { minHeight: '96px', display: 'flex', paddingRight: '19px', justifyContent: 'space-between', alignItems: 'flex-end' },
  agents: { display: 'flex', flex: '1', minHeight: '180px' },
  counter: { color: '#3a3541', fontSize: '20px', lineHeight: '21px', letterSpacing: '0.25px', opacity: '0.60' },
  counterName: { color: '#3a3541', fontSize: '12px', lineHeight: '21px', letterSpacing: '0.25px', opacity: '0.60' },
  actions: { display: 'flex', paddingRight: '19px', justifyContent: 'space-between', alignItems: 'flex-end' }
}))