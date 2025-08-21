import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Reuse the same CSS for consistent styling

const Privacy = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1 className='logoName'>Mintr</h1>
        </div>

        <div className="login-form">
          <h2>Privacy Policy</h2>
          <p className="subtitle">Your privacy is important to us</p>

          <div className="terms-text" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
            </p>

            <p>
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. 
              Nullam varius, turpis et commodo pharetra, est eros bibendum elit, 
              nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh 
              euismod gravida. Duis ac tellus et risus vulputate vehicula. 
            </p>

            <p>
              Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, 
              eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. 
              Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
            </p>
          </div>

          <div className="signup-link" style={{ marginTop: '20px' }}>
            <p>
              <Link to="/register" className="link">Back to Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
