import { makeStyles } from '@material-ui/core/styles';

const dialog = {
  display: 'flex',
  flexDirection: 'column',
}

const chatBalloonText = {
  lineHeight: '1.5',
  letterSpacing: '0.15px',
  minHeight: '45px',
  padding: '12px 16px',
}

export const useStyles = makeStyles((theme) => ({
  dialogUser: {
    ...dialog,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  dialogAgent: {
    ...dialog,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  dialogFiles: {
    ...dialog,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  chatBalloonFiles: {
    ...dialog,
    alignItems: 'flex-end',
    marginTop: '10px',
  },
  chatBalloonUser: {
    ...dialog,
    alignItems: 'flex-end',
  },
  chatBalloonAgent: {
    ...dialog,
    alignItems: 'flex-start',
  },
  chatBalloonTextUser: {
    ...chatBalloonText,
    backgroundColor: '#3f51b5',
    color: '#FFF',
    borderRadius: '6px 6px 0px 6px',
  },
  chatBalloonTextFiles: {
    color: 'rgba(58, 53, 65, 0.6)',
    fontSize: '16px',
  },
  chatBalloonTextAgent: {
    ...chatBalloonText,
    backgroundColor: '#FFF',
    color: 'rgba(58, 53, 65, 0.87)',
    borderRadius: '6px 6px 6px 0px',
  },
  chatBalloonTime: {
    color: 'rgba(58, 53, 65, 0.6)',
    fontSize: '12px',
    padding: '6px 0'
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
  },
  uploadedFile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    alignItems: 'flex-end',
    textAlign: 'end',
  },
  uploadedFileBalloon: props => ({ display: 'flex', flexDirection: 'row', alignItems: 'center', 
  backgroundColor: props.withError ? '#f34343' : '#b2afaf', 
  color: 'white', borderRadius: '6px 6px 0px 6px', padding: '8px 15px 8px 20px', marginBottom: '5px' }),
  uploadedFileDetails: { display: 'flex', flexDirection: 'column', marginLeft: '12px', textAlign: 'left' },
  uploadedFileDetailsName: {},
  uploadedFileDetailsSize: { fontSize: '12px', marginTop: '5px' },
}));