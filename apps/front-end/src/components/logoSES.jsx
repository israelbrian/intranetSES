import React from "react";
import { Link } from "react-router-dom";
const Logo_SES = () => {
  return (
    <>
      {/* <!-- Logo SES  --> */}
      <div className="row">
        <div className="col-md-6" data-aos="fade-up">
          <Link to="/vpn" className="text-decoration-none">
            <div className="link-content mt-3">
              <img src="src/img/logo-ses.png" alt="image" className="mt-5" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Logo_SES;
