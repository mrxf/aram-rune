import React from "react";
import style from "./index.module.less";
import { IRouteItem } from "src/constants/interfaces/IRouterItem";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
interface TopNavProps extends RouteComponentProps {
  routeItems: IRouteItem[];
}

const TopNav: React.FC<TopNavProps> = () => {
  return (
    <div className={style.topNav}>
      <div className={style.logo}>
        <Link to="/">
          <h1>{process.env.REACT_APP_SITE_NAME}</h1>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(TopNav);
