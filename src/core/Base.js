import React from "react";
import Menu from "./Menu";

const BASE = ({
  title = "My Title", // this has become as the base for every route
  description = "My description",
  className = "p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron-fluid  mt-2 txt text-center ">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
      </div>

      <div className={className}>{children}</div>

      <footer className="footer mt-auto py-3 txt">
        <div className="container-fluid text-center py-3 txt">
          <h4>If you got any questions , feel free to reach out!</h4>
          <button className="btn btn-lg mybtn">Contact Us</button>
        </div>
        <div className="container text-center txt">
          <span className="text-muted">
            made with <i class="fa fa-heart"></i> Shivanshu Garg
          </span>
        </div>
      </footer>
    </div>
  );
};
export default BASE;
