import {useState} from 'react'

function useGraphQl() {
  function graphQuery(query) {
    fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({query}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed!")
        }
        return res.json();
    }).then((resData) => {
        if (resData.data.validate.firstName) {
          return {
            ...resData.data
          }
        } else {
          throw new Error("Response Parsing Failed!")
        }
    }).catch((err) => {
        console.log(err)
      });
  }
  return {graphQuery}
}

export default useGraphQl