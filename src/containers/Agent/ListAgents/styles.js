import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 326,
    minHeight: 183,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    minHeight: 183,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    color: '#1414e4',
    cursor: 'pointer',
  },
  cardTitle: { 
    color: 'black', 
    overflow: 'hidden',
    whiteSpace: 'nowrap' 
  },
}));