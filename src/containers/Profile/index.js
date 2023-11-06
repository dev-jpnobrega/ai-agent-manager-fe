import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

import ImageLoader from '../../components/ImageLoader';

function Profile({ userId }) {
  const [ t, i18n ] = useTranslation('translation');
  const [ state, dispatch ] = useContext(Context);
  const { user } = state; 

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_BY_ID',
      id: userId,
    })
  }, [ userId ]);

  function renderUser() {
    return (
      <>
        <span className="avatar">
        </span>
        <h1>{t('home.title')}</h1>
        <ul className="icons">
          <li>
            <a href={user.socialLinks.twitter} className="icon style2 fa-twitter">
              <span className="label">Twitter</span>
            </a>
          </li>
          <li>
            <a href={user.socialLinks.github} className="icon style2 fa-github">
              <span className="label">Github</span>
            </a>
          </li>
          <li>
            <Link to='/404'>404</Link>
            <a href={user.socialLinks.medium} className="icon style2 fa-medium" alt="Medium">
              <span className="label">Instagram</span>
            </a>
          </li>
          <li>
            <a href={user.socialLinks.linkedin} className="icon style2 fa-linkedin">
              <span className="label">500px</span>
            </a>
          </li>
          <li>
            <a href={user.socialLinks.email} className="icon style2 fa-envelope-o">
              <span className="label">Email</span>
            </a>
          </li>
        </ul>
      </>
    )
  }

  return !user.id ? (
    <div />
  ) : renderUser();
}


export default Profile;