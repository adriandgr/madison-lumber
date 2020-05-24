export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      console.log(serializedState);
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    // if the browser doesn't allow access to local storage, don't do anything
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore
  }
}