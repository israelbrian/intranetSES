import img_1 from "../img/VPN.jpg";
import img_2 from "../img/outlook.jpg";
import img_3 from "../img/notebook.jpg";
import img_4 from "../img/telefone.jpg";
import img_5 from "../img/notebook.jpg";

import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Mousewheel, Pagination } from "swiper/modules";

const dataList = {
  items: [
    {
      title: "VPN (Acesso Remoto)",
      description:
        "Como solicitar o acesso a VPN? Erros frequentes, Manual e Planilha de solicitação...",
      link: "vpn",
      img: img_1,
    },
    {
      title: "Erro ao logar no Outlook",
      description:
        "Meu outlook não abre como proceder? Possiveis alternativas para resolver esse erro...",
      link: "outlook",
      img: img_2,
    },
    {
      title: "Co-Working FHEMIG",
      description:
        "Com o fechamento do prédio da cidade administrativa temos a possibilidade de trabalhar presencialmente no prédio da Fhemig ...",
      link: "fhemig",
      img: img_3,
    },
    {
      title: "JABBER",
      description:
        "Bom, com a situação atual do prédio todos os servidores foram alocados em teletrabalho e com isso vem a utilização do Jabber ...",
      link: "jabber",
      img: img_4,
    },
    {
      title: "Siga-me",
      description:
        "O sistema 'SIGA-ME' é uma funcionalidade liberada pela PRODEMGE, para o uso enquanto durar a interdição dos Prédios Minas e Gerais ...",
      link: "siga_me",
      img: img_5,
    },
  ],
};

const Cards = () => {
  return (
    <div>
      {/* <!-- INICIO DUVIDAS FREQUENTES --> */}
      <section className="container p-5 mt-5 bg-white section-duvidas rounded-3">
        <h1
          className="display-4 text-center p-3 text-uppercase"
          data-aos="fade-up"
        >
          Dúvidas frequentes
        </h1>
        <Swiper
          direction={"horizontal"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper"
        >
          {dataList.items.map((item, index) => (
            <div className="row">
              {/* <!-- Cards Problemas T.I  --> */}
              <SwiperSlide>
                <div className="col-md-6" key={index} data-aos="fade-up">
                  <Link to={item.link} class="text-decoration-none">
                    <div className="link-content">
                      <h3 className="p-2 mt-2 display-6">{item.title}</h3>
                      <img src={item.img} alt="Image" className="img-1" />
                      <p className="lead text-secondary mt-4">
                        {item.description}
                      </p>
                      <p>LER MAIS</p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </section>
      {/* <!-- FIM DUVIDAS FREQUENTES --> */}
    </div>
  );
};

export default Cards;
