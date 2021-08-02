import React from 'react';
import { twitterRules } from '../modules/twitter';
import { Timeline, Tweet } from 'react-twitter-widgets'

const Twitter = () => {

  const submit = async (e) => {
    e.preventDefault();
    let response = await twitterRules()
    if (response.status === 200) {
      debugger
    } else {
      debugger
    }
  }

  return (
    <>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "team3dstocks"
        }}
        options={{ id: "profile:team3dstocks" }}
      />
      <h1>Twitter Feed</h1>
      <h4>Live updates from User:</h4>
      <form id="twitter-form" onSubmit={submit}>
        <div>
          <label>Username</label>
          <input 
            required
            type="text"
            placeholder="Twitter Handle"
            name="username"
            id="username"
          />
        </div>
        <button id="twitter-submit">Follow Tweets!</button>
      </form>
    </>
  )
}

export default Twitter