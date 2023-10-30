import React, { useContext, useEffect } from 'react';

import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { Context } from '../../context';

import MenuNotifications from '../../components/MenuNotification';
import NotificationsItems from '../../components/MenuNotification/NotificationItems';

const NOTIFICATIONS_SUBSCRIBE = gql`
  subscription onNotifications($userId: ID, $countryCode: String, $companyId: Int, $severity: [PublicationSeverity]) {
    notifications(userId: $userId, countryCode: $countryCode, companyId: $companyId, severity: $severity) {
      id
      message
      severity
      createdAt
      user {
        name
      }
      channel {
        name
      }
    }
  }
`;

const GET_NOTIFICATIONS = gql`
  query getNotifications($countryCode: String!, $companyId: Int!, $userId: ID, $channelId: ID) {
    getNotifications(countryCode: $countryCode, companyId: $companyId, userId: $userId, channelId: $channelId) {
      id
      message
      severity
      createdAt
      user {
        name
      }
      channel {
        name
      }
    }
  }
`;

let sub;
function Notifications({
  anchorNotificationOpen, filters, handleDrawerNotificationToggle, menuNotificationOpen
}) {
  const [ state, dispatch ] = useContext(Context);
  const { notifications: { notifications } } = state;

  const { subscribeToMore, data } = useQuery(GET_NOTIFICATIONS, { variables: { countryCode: 'PE', companyId: 1 }});

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'FETCHED_NOTIFICATIONS',
        notifications: data.getNotifications,
      })
    };   
  }, [data]);
 
  return (
    <MenuNotifications 
      handleDrawerNotificationToggle={handleDrawerNotificationToggle}
      menuNotificationOpen={menuNotificationOpen}
      anchorEl={anchorNotificationOpen}>
        <NotificationsItems notifications={notifications}>
        { 
          (!sub) ?
            sub = subscribeToMore({
              document: NOTIFICATIONS_SUBSCRIBE,
              variables: { countryCode: 'PE', companyId: 1 },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
    
                const newNotificationItem = subscriptionData.data.notifications;
    
                return {
                  ...prev,
                  getNotifications: [...prev.getNotifications,  newNotificationItem]
                }
              }
          }) : []
        }
        </NotificationsItems>
    </MenuNotifications>
  );
}

export default Notifications;