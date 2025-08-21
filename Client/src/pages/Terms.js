import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Reuse the same CSS for styling

const Terms = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h1 className='logoName'>Mintr</h1>
        </div>

        <div className="login-form">
          <h2>Terms and Conditions</h2>
          <p className="subtitle">Please read our terms carefully</p>

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
              Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. 
              Praesent mauris. Fusce nec tellus sed augue semper porta. 
              Mauris massa. Vestibulum lacinia arcu eget nulla.
            </p>

            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
              Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. 
              Curabitur tortor. Pellentesque nibh. Aenean quam. 
              In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.
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

export default Terms;
