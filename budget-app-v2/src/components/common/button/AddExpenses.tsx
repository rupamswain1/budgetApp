import { PartialIButtonProps } from "$interfaces";
import IconButton from "../iconButton/IconButton";
import { LuReceiptIndianRupee } from "react-icons/lu";
import './button.style.scss'
const AddExpenses: React.FC<PartialIButtonProps> = ({
  id = "add-expenses",
  isActive = true,
  name="Add",
  Icon=LuReceiptIndianRupee,
  customClass="",
  onClick
}) => {
  console.log("AddExpenses")
  return (
    <IconButton
      id={id}
      isActive={isActive}
      Icon={Icon}
      name={name}
      customClass={"center-btn nav-btn-selected "+customClass}
      isNameVisible = {false}
      iconColor="white"
      handleClick={onClick}
    />
  );
};

export default AddExpenses;
