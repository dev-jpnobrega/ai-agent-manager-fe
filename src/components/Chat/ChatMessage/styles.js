import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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