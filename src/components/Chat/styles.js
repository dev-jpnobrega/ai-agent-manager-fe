import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiDialog-paper': {
      backgroundColor: '#f5f5f5',
      maxHeight: props.mobile ? '' : '520px',
      minWidth: props.mobile ? '' : '600px',
    },
  }),
  inputChat: {
    width: '100%',
    color: 'black',
    border: 'none',
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
  },
  dialogContent: {
    minHeight: '350px',
  },
  dialogActions: {
    width: '100%',
    height: '50px',
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
}));