import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiDialog-paper': {
      backgroundColor: '#f5f5f5',
    },
  }),
  inputChat: {
    resize: 'none',
    whiteSpace: 'pre-line',
    width: '100%',
    color: 'black !important',
    opacity: '1',
    fontSize: '14px',
    fontWeight: 'bolder',
    border: 'none',
    letterSpacing: '0.3px',
    paddingLeft: '10px',
    "&:hover, &:focus, &:active": {
      border: 0,
      outline: 'none',
    }
  },
  dialogTitle: {
    color: 'black',
    borderBottom: '1px solid #e0e0e0',
  },
  dialogTexts: {
    color: 'black',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
  },
  dialogTextsSub: {
    color: 'rgba(58, 53, 65, 0.38)'
  },
  dialogTitleButtons: {
    display: 'flex',
    gap: '10px',
  },
  dialogTitleMenuButtons: {
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
    justifyContent: 'flex-end',
  },
  dialogContent: {
    minHeight: '350px',
  },
  dialogActions: {
    width: '100%',
    height: '58px',
    backgroundColor: '#FFF',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
  },
  sendButton: {
    margin: theme.spacing(1),
  },
  uploadedFiles: {
    fontSize: '14px',
    color: '#0000008a',
    marginBottom: '16px',
  },
  chatAgentInfo: {
    paddingLeft: '8px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
  },
  codeBlock: {
    background: '#111b27',
    borderRadius: '4px',
    padding: '0.5rem 0rem',    
    marginTop: '1rem'
  },
  codeBlockButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '12px',
    alignItems: 'center',
  }
}));