import React from 'react';

const Twitter = () => {

  const submit = (e) => {
    e.preventDefault();
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