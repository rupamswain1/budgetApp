import { itemType, ITEM_TYPES } from "$interfaces";
import "./header.style.scss";
export const H1 = ({ text, type }: { text: string; type: itemType }) => {
  return (
    <h1
      className={`${
        type === ITEM_TYPES.PRIMARY ? "primary" : "secondary"
      } h1-text`}
    >
      {text}
    </h1>
  );
};

export const H1lg = ({ text, type }: { text: string; type: itemType }) => {
  return (
    <h1
      className={`${
        type === ITEM_TYPES.PRIMARY ? "primary" : "secondary"
      } h1lg-text`}
    >
      {text}
    </h1>
  );
};

export const H2 = ({ text, type }: { text: string; type: itemType }) => {
  return (
    <h2
      className={`${
        type === ITEM_TYPES.PRIMARY ? "primary" : "secondary"
      } h2-text`}
    >
      {text}
    </h2>
  );
};
