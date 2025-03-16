import { itemType, ITEM_TYPES } from "$interfaces";
import "./header.style.scss";
export const H1 = ({ text, type, className }: { text: string; type: itemType; className?:string }) => {
  console.log("H1")
  return (
    <h1
      className={`${
        type === ITEM_TYPES.PRIMARY ? "primary" : "secondary"
      } h1-text ${className ?? ''}`}
    >
      {text}
    </h1>
  );
};

export const H1lg = ({ text, type }: { text: string; type: itemType }) => {
  console.log("H1lg")
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
  console.log("H2");
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


export const H3 = ({ text, type }: { text: string; type: itemType }) => {
  console.log("H3");
  return (
    <h2
      className={`${
        type === ITEM_TYPES.PRIMARY ? "primary" : "secondary"
      } h3-text`}
    >
      {text}
    </h2>
  );
};
