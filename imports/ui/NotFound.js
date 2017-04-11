import React from 'react';
import {Link} from 'react-router-dom';
export default (props) => {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
              <h1>Page Not Found</h1>
            <p><code className="boxed-view__code">{props.location.pathname}</code>
            is not a valid path.</p>
            <Link to="/" className="button button--link">HEAD HOME</Link>
          </div>
        </div>
    );
}
