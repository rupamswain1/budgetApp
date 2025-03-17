import "./error.style.scss";

interface ErrorProps {
  text: string;
}

const ErrorCard: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className="error-container">
      <div className="error-card error">{text}</div>
    </div>
  );
};

export default ErrorCard;
