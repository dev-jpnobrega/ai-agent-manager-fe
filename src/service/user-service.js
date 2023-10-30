import { Auth } from 'aws-amplify';

const FAVORITE_LOCAL_STORAGE = 'favorites';

export const userInfo = () => new Promise((resolve, reject) => {
  Auth.currentAuthenticatedUser()
    .then(data => resolve(data.attributes))
    .catch(err => reject(err));
});

export const userCurrentSession = () => new Promise((resolve, reject) => {
  Auth.currentSession()
    .then(data => resolve(data))
    .catch(err => reject(err));
});
  
const create = (userId) => {
  return set({
    [userId]: [],
  });
}

const createOrGet = (userId) => {
  const favorites = get();

  if (favorites !== null) {
    if (favorites[userId]) return favorites;

    const newFavorites = {
      ...favorites,
      [userId]: [],
    }

    return set(newFavorites);
  }

  create(userId);

  return get();
}

const set = (favorites) => localStorage.setItem(FAVORITE_LOCAL_STORAGE, JSON.stringify(favorites));

const get = () => {
  return JSON.parse(localStorage.getItem(FAVORITE_LOCAL_STORAGE));
}

export const getFavorites = (userId) => new Promise((resolve, _) => {
  const favorites = createOrGet(userId);

  if (favorites[userId]) {
    return resolve([ ...favorites[userId] ]);
  }

  return resolve([]);
});

export const addFavorites = (productUids = [], userId) => {
  const favorites = createOrGet(userId);

  const find = favorites[userId].includes(productUids[0]);

  if (find) {
    favorites[userId] = [
      ...favorites[userId].filter(x => x !== productUids[0]),
    ];
  } else {
    favorites[userId] = [
      ...favorites[userId],
      ...productUids,
    ];
  };

  set(favorites);

  return favorites[userId];
}