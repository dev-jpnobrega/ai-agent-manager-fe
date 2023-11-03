export default reducers => {
  const extractActionContext = action => {
    const actionContext = action.type.split('_');

    if (actionContext.length === 0) return;

    return actionContext[0];
  }


  const state = Object.keys(reducers).reduce(
    (acc, key) => ({ ...acc, [key]: reducers[key][0] }),
    {},
  );

  const dispatch = action =>
    Object.keys(reducers)
      .map(key => {
        if (extractActionContext(action) === key.toUpperCase()) {        
          return reducers[key][1];
        }
        return undefined;
      })
      .forEach(fn => {
        if (fn) return fn(action);
        return undefined;
      });

  return [ state, dispatch ];
};
