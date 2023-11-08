import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiDialog-paper': {
      backgroundColor: '#f5f5f5'
    },
  }),
  agentsSession: {
    padding: theme.spacing(2),
    borderRight: '1px solid rgb(217, 217, 217)'
  },
  chatSession: {
    fontWeight: 800,
  },
  chatTexts: {
    color: 'black',
  },
  chatTextsSub: {
    color: 'rgba(58, 53, 65, 0.38)'
  },
  chatListItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatHistory: {
    maxHeight: '450px',
    overflow: 'auto',
    padding: '12px 10px',
  },
  chatSelectInfo: {
    backgroundColor: '#86868612',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatSelectInfoIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: 'rgba(58, 53, 65, 0.42) 0px 4px 8px -4px',
  },
  uploadedFiles: {
    fontSize: '14px',
    color: '#0000008a',
    marginBottom: '16px',
  },
}));