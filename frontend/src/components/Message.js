import React from 'react'

function Message(props) {
  return (
    <article class="message is-danger">
      <div class="message-header">
        <p>{props.title}</p>
        <button 
          class="delete" 
          aria-label="delete"
          onClick={() => props.setMessage('')}
          />
      </div>
      <div class="message-body">
        {props.children}
      </div>
    </article>
  )
}

export default Message