import { ITEM_TYPES } from "$interfaces";
import Button from "../button/Button";
import "./error.style.scss";

interface ErrorProps {
  text: string;
  retryFunction: () => void;
}

const ErrorCard: React.FC<ErrorProps> = ({ text, retryFunction }) => {
  return (
    <div className="error-container">
      <div className="error-card error">
        <span>{text}</span>
        <Button
          type={ITEM_TYPES.PRIMARY}
          name="Retry"
          onClick={retryFunction}
        />
      </div>
    </div>
  );
};

export default ErrorCard;
