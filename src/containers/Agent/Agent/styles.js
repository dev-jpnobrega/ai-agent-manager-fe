import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  link: {
    color: '#1414e4',
    cursor: 'pointer',
  },
  cardTitle: { color: 'black' },
}));