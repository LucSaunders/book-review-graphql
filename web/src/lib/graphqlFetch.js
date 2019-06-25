const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

// args contains the graphql query that needs to be executed
export default url => args => {
  const body = JSON.stringify(args);
  //   Call browser's fetch api, passing in url parameter, and options defined above, adding in body property
  return fetch(url, { ...options, body }).then(res => res.json());
};
