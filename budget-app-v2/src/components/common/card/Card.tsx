import { ITEM_TYPES } from "$interfaces";
import { H2, H3 } from "../header/Header";

import "./card.style.scss";

const Card = ({
  title,
  amount = null,
  enableScroll = false,
  headerComponent = null,
  children,
}: {
  title: string;
  amount?: number | null;
  enableScroll?:boolean | null;
  headerComponent?:JSX.Element | null;
  children: JSX.Element;
}) => {
  return (
    <section className="cardContainer" style={enableScroll ? {overflow:'auto'} : {}}>
      <div className="headerContainer">
        <H2 text={title} type={ITEM_TYPES.PRIMARY} />
        {amount !== null && (
          <H3
            text={`\u20B9 ${parseFloat(amount.toFixed(2))}`}
            type={ITEM_TYPES.SECONDARY}
          />
        )}
        {
          headerComponent && headerComponent
        }
      </div>
      {children}
    </section>
  );
};

export default Card;
