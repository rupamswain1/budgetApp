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
        <input
          type="text"
          id="userName"
          ref={enteredUser}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
