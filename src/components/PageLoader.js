import { memo } from "react";
import truelineLogo from "../images/Trueline Logo.png";

const PageLoader = ({ visible }) => (
  <div
    className={`page-loader${visible ? "" : " page-loader--hidden"}`}
    aria-hidden={!visible}
  >
    <div className="page-loader__brand">
      <img
        className="page-loader__logo"
        src={truelineLogo}
        alt="Trueline Research Private Limited logo"
      />
      <p className="page-loader__name">Trueline Research Private Limited</p>
    </div>
    <div className="page-loader__indicator" role="status">
      <span className="page-loader__ring" />
      <span className="page-loader__label">Loading</span>
    </div>
  </div>
);

export default memo(PageLoader);
