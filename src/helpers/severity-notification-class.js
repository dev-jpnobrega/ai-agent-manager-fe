import { red, blue, yellow } from '@material-ui/core/colors';

const classes = {
  LOW: {
    avatar: {
      backgroundColor: blue[900],
    },
  },
  MEDIUM: {
    avatar: {
      backgroundColor: yellow[500],
    },
  },
  HIGHT: {
    avatar: {
      backgroundColor: red[700],
    },
  }
}

function severityClasse(severity) {
  return classes[severity];
}

export default severityClasse;
