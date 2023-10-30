import React, { useEffect } from 'react';
import { withSnackbar, useSnackbar } from 'notistack';
import gql from 'graphql-tag';
import { useSubscription } from 'react-apollo';

import Notification from '../../components/Notification';

const CHANNEL_SUBSCRIBE = gql`
  subscription onNotifications($userId: ID, $countryCode: String, $companyId: Int, $severity: [PublicationSeverity]) {
    notifications(userId: $userId, countryCode: $countryCode, companyId: $companyId, severity: $severity) {
      id
      message
      severity
      user {
        name
      }
      channel {
        name
      }
    }
  }
`;

function SnackNotifications({ enqueueSnackbar, countryCode, companyId, severity }) {
  const { closeSnackbar } = useSnackbar();
  const { data, loading } =
    useSubscription(CHANNEL_SUBSCRIBE, { variables: { countryCode, companyId, severity }})

  useEffect(() => {
    function runSnackBar(notication) {
      enqueueSnackbar(notication.message, {
        content: (key) => (
          <Notification id={key} notification={notication} actions={{ close: true, expand: true }} onClose={closeSnackbar} />
        )
      });
    };

    if (data) runSnackBar(data.notifications);

  }, [data]);

  return (<div/>);
}

export default withSnackbar(SnackNotifications);