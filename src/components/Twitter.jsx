import React, { useState, useEffect } from 'react';
import { sendTwitterHandle, getHandles } from '../modules/twitter';
import { Timeline } from 'react-twitter-widgets'
import { Dropdown } from 'semantic-ui-react'

const Twitter = () => {
  const [twitterAccount, setTwitterAccount] = useState("")
  const [twitterHandles, setTwitterHandles] = useState([])

  const submit = async (e) => {
    e.preventDefault();
    let response = await sendTwitterHandle(e.target.username.value)
    response.status === 200 && setTwitterAccount(response.data.name)
  }

  const indexTwitterHandles = async () => {
    let response = await getHandles()
    if (response !== undefined && response.status === 200) {
      setTwitterHandles()
    } else {

    }
  }

  useEffect(() => {
    indexTwitterHandles()
  }, [twitterAccount])

  return (
    <>
      <h1>Twitter Feed</h1>
      <div>
        <h3>Saved Accounts</h3>
        <Dropdown
          placeholder= "Choose"
          clearable
          fluid
          options={twitterHandles}
          // onChange={event => {
            
          // }}
        />
      </div>
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
      {twitterAccount !== "" && <h4>Showing {twitterAccount} timeline:</h4>}
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