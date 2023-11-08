import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiInputBase-multiline': {
      backgroundColor: '#fff',
    },
    width: '100%', paddingRight: props.mobile ? '' : '30px'
  }),
  switchForm: {
    color: 'black', marginTop: '10px'
  },
  select: props => ({ paddingRight: props.mobile ? '' : '30px', backgroundColor: '#fff' }),
  selectForm: props => ({  width: '100%', paddingRight: props.mobile ? '' : '30px' })
}));