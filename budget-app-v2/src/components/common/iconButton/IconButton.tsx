import { Icons } from "$components";
import "./iconButton.style.scss";
import { IconButtonProps } from "$interfaces";

const IconButton: React.FC<IconButtonProps> = ({
  id,
  customClass,
  isActive,
  Icon,
  name,
  handleClick,
  isNameVisible,
  iconColor,
  isDisabled=false
}) => {
  console.log("IconButton")
  return <button
    key={id}
    className={`nav-btn ${isActive ? "nav-btn-selected" : ""} ${customClass}`}
    onClick={handleClick}
    disabled={isDisabled}
  >
    <div>
      <div className="nav-logo">
        <Icons Components={Icon} key={id} color = {iconColor}/>
      </div>
      {(isNameVisible === undefined || isNameVisible) && (
        <div className="nav-name">{name}</div>
      )}
    </div>
  </button>
};

export default IconButton;
