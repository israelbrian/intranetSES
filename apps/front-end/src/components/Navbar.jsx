import Reac from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* <!-- INICIO CABEÇALHO --> */}
      <header data-aos="fade-up">
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
          {" "}
          {/* <!-- INICIO CONTAINER --> */}
          <div className="container">
            <a className="navbar-brand p-3 pb-4" href="#">
              <h1 id="titulo-1" className="fw-light fs-1">
                Assessoria de Tecnologia da informação (SES)
              </h1>
              {/* <img
                className="logo-header"
                src="src/icons/icon (1).png"
                alt="logo"
              /> */}
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#nav-principal"
            >
              <i className="fa-solid fa-bars text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="nav-principal">
              <ul className="navbar-nav ms-auto mb-2 fw-light menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Pagina Inicial
                  </Link>
                </li>

                <li className="nav-item divisor"></li>

                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Comunicados
                  </a>
                </li> */}

                <li className="nav-item divisor"></li>

                <li className="nav-item">
                  <Link to="/contato" className="nav-link">
                    Fale conosco
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* <!-- FIM CABEÇALHO --> */}

      {/* <!-- DIV ESPAÇAMENTO --> */}
      <div className="p-5">
        <p className="d-none">spacing</p>
      </div>
    </div>
  );
};

export default Navbar;
