import { Icons } from "$components";
import "./iconButton.style.scss";
interface IconButtonProps {
  id: string;
  customClass?: string;
  isActive: boolean;
  Icon: React.ElementType;
  name: string;
  handleClick?: () => void;
  isNameVisible?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  id,
  customClass,
  isActive,
  Icon,
  name,
  handleClick,
  isNameVisible,
}) => (
  <button
    key={id}
    className={`nav-btn ${isActive ? "nav-btn-selected" : ""} ${customClass}`}
    onClick={handleClick}
  >
    <div>
      <div className="nav-logo">
        <Icons Components={Icon} key={id} />
      </div>
      {(isNameVisible === undefined || isNameVisible) && (
        <div className="nav-name">{name}</div>
      )}
    </div>
  </button>
);

export default IconButton;
