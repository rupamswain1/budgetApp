import { useRef } from 'react';

const Login = ({ setUserName }) => {
  const enteredUser = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!enteredUser.current.value) {
      alert('Please enter a user name');
    }
    setUserName(enteredUser.current.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        Enter Your Name
      </h2>
      <div style={{ marginBottom: '15px' }}>
        <label
          htmlFor="userName"
          style={{ display: 'block', marginBottom: '5px' }}
        >
          Name:
        </label>
        <input type="text" id="userName" ref={enteredUser} className="input" />
      </div>
      <button type="submit" className="primaryBtn">
        Submit
      </button>
    </form>
  );
};

export default Login;
