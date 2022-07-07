import React from 'react';

function QaListItem() {
  return (
    <article>
      <details>
        <summary>
          <span>
            This is supposed to be a question?
          </span>
          <small>
            Helpful?
            <a href="#">Yes</a>
            <a href="#">Add Answer</a>
          </small>
        </summary>
        <div>
          <ul>
            <li>
              123
            </li>
            <li>
              456
            </li>
          </ul>
        </div>
      </details>
    </article>
  );
}

export default QaListItem;
