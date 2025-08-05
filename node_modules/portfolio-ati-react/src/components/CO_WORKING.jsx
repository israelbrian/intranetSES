import React from "react";
import { Link } from "react-router-dom";
const CoWorking = () => {
  return (
    <div>
      {/* <!-- CO WORKING  --> */}
      <div className="row">
        <div className="col-md-6" data-aos="fade-up">
          <Link to="/fhemig" className="text-decoration-none">
            <div className="link-content">
              {/* <!-- <h3 className="p-2 mt-2 display-6">E-mail equipe TI</h3>
                        <p className="lead mt-4 text-primary ms-3">suporteti.ca@saude.mg.gov.br</p> --> */}
              <h3 className="p-2 mt-2 display-6">
                Equipe Técnica / E-mail / Ramal{" "}
              </h3>
              <ul className="list-group mt-4">
                <li className="list-group-item">
                  Alexander Spelta / alexander.spelta@saude.mg.gov.br / 31
                  3916-0031
                </li>
                <li className="list-group-item">
                  Edinei Goncalves Araujo / edinei.araujo@saude.mg.gov.br / 31
                  3916-0031
                </li>
                <li className="list-group-item">
                  Wesley Francisco Soares Fernandes /
                  wesley.fernandes@saude.mg.gov / 31 3916-0817
                </li>
                <li className="list-group-item">
                  Ivanir Franca / ivanir.franca@saude.mg.gov.br / 31 3915-9826
                </li>
                <li className="list-group-item">
                  Israel Brian Pimenta Gonçalves Araújo /
                  israel.goncalves@saude.mg.gov / 31 3916-0031
                </li>
                <li className="list-group-item">
                  João Victor Parreiras Soares / joao.soares@saude.mg.gov.br /
                  31 3916-0031
                </li>
                <li className="list-group-item">
                  E-mail equipe TI: suporteti.ca@saude.mg.gov.br
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoWorking;
