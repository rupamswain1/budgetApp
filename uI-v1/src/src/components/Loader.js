const Loader = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <p style={{ marginTop: '10px', fontSize: '16px', color: '#555' }}>
        Loading...
      </p>
      <style>
        {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
      </style>
    </div>
  </div>
);
export default Loader;
