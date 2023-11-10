import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  uploader: { border: '1px solid #bdbdbd', borderRadius: '5px', backgroundColor: 'white' },
  uploaderActions: { display: 'flex', gap: '5px', padding: '10px', borderRadius: '5px 5px 0 0', width: '100%' },
  uploaderContent: { borderTop: '1px solid #bdbdbd', padding: '10px' },
  uploaderFileItem: { display: 'flex', gap: '5px', width: '100%', alignItems: 'center' },
  uploaderFileDetails: props => ({ paddingLeft: props.mobile ? '0' : '15px' }),
  uploaderFileDetailsSize: { display: 'flex', width: '100%', fontSize: '12px', alignItems: 'center' },
  uploaderFileDetailsStatus: { marginLeft: '8px', backgroundColor: 'orange', fontSize: '12px' },
  uploaderFileDetailsLabel: props => ({ maxWidth: props.mobile ? '165px' : '100%' , overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
}));