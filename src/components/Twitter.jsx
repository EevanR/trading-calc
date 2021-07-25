import React from 'react';
import { twitterRules } from '../modules/twitter';

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