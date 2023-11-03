import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: props => ({
    '& .MuiDialog-paper': {
      backgroundColor: '#f5f5f5',
      maxHeight: props.mobile ? '' : '500px',
      minWidth: props.mobile ? '' : '600px',
    },
  }),
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  link: {
    color: '#1414e4',
    cursor: 'pointer',
  },
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
  dialog: {
    backgroundColor: '#f5f5f5',
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
  dialogUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  dialogAgent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  chatBalloonUser: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-end',
  },
  chatBalloonAgent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start',
  },
  chatBalloonTextUser: {
    backgroundColor: '#3f51b5',
    color: '#FFF',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    minHeight: '45px',
    padding: '12px 16px',
    borderRadius: '6px 6px 0px 6px',
  },
  chatBalloonTextAgent: {
    backgroundColor: '#FFF',
    color: 'rgba(58, 53, 65, 0.87)',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    minHeight: '45px',
    padding: '12px 16px',
    borderRadius: '6px 6px 6px 0px',
  },
  chatBalloonTime: {
    color: 'rgba(58, 53, 65, 0.6)',
    fontSize: '12px',
    paddingBottom: '10px'
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
  boxHeight: {
    height: '2px',
  },
  chatImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    objectPosition: '25% 25%',
    cursor: 'pointer',
    "&:hover": {
      opacity: 0.5,
    }
  }
}));