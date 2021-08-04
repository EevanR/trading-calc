import React, { useState } from 'react';
import { sendTwitterHandle } from '../modules/twitter';
import { Timeline } from 'react-twitter-widgets'

const Twitter = () => {
  const [twitterAccount, setTwitterAccount] = useState("")

  const submit = async (e) => {
    e.preventDefault();
    let response = await sendTwitterHandle(e.target.username.value)
    if (response.status === 200) {
      setTwitterAccount(response.data.name)
    } else {
      
    }
  }

  return (
    <>
      <h1>Twitter Feed</h1>
      <h4>Live updates from User:</h4>
      <form id="twitter-form" onSubmit={submit}>
        <div>
          <label>Username: @</label>
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
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: twitterAccount
        }}
        options={{ 
          id: `profile:${twitterAccount}`, 
          theme: "dark",
          tweetLimit: "6"
        }}
      />
    </>
  )
}

export default Twitter