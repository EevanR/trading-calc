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
    let handleIndex = []
    let response = await getHandles()
    if (response !== undefined && response.status === 200) {
      let key = 1
      let value = 1
      response.data.forEach(handle => {
        handleIndex.push({key: key++, value: value++, text: handle.name})
      })
      setTwitterHandles(handleIndex)
    }
  }

  const onChangeHandler = (e) => {
    setTwitterAccount(e.target.textContent)
  }

  const refreshTimeline = () => {
    let account = twitterAccount
    setTwitterAccount("")
    setTimeout(() => {
      setTwitterAccount(account)
    }, 300);
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
          id="handle-dropdown"
          placeholder= "Choose"
          clearable
          fluid
          options={twitterHandles}
          onChange={onChangeHandler}
        />
      </div>
      <h3>Follow new account</h3>
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
        <button id="twitter-submit">Submit</button>
      </form>
      {twitterAccount !== "" && <h4>Showing {twitterAccount}'s last 10 tweets:</h4>}
      <i className="redo icon" onClick={() => refreshTimeline() }></i>
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