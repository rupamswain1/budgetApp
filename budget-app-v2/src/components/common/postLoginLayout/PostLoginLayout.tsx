import { ITEM_TYPES } from "$interfaces";
import { H1 } from "../header/Header";

import "./postloginLayout.style.scss";

interface PostLoginLayoutProps {
  title: string;
  children: JSX.Element;
}

const PostLoginLayout: React.FC<PostLoginLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <div className="pageContainer">
      <H1 text={title} type={ITEM_TYPES.PRIMARY} />
      {children}
    </div>
  );
};

export default PostLoginLayout;
