import imgSignature from "../img/assinatura.jpg";
import imgVPN from "../img/VPN.jpg";
import imgSigame from "../img/notebook2.jpg";
import imgOutlook from "../img/outlook.jpg";
import imgNotebook from "../img/notebook.jpg";
import imgTelphone from "../img/telefone.jpg";

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
      title: "Gerarando assinatura de e-mail",
      description:
        "Padronize sua assinatura de e-mail utilizando o 'Gerador de assinatura' e seguindo nosso manual..",
      link: "SignatureGenerator",
      img: imgSignature,
    },
    {
      title: "VPN (Acesso Remoto)",
      description:
        "Como solicitar o acesso a VPN? Erros frequentes, Manual e Planilha de solicitação...",
      link: "vpn",
      img: imgVPN,
    },
    {
      title: "Erro ao logar no Outlook",
      description:
        "Meu outlook não abre como proceder? Possiveis alternativas para resolver esse erro...",
      link: "outlook",
      img: imgOutlook,
    },
    {
      title: "Co-Working FHEMIG",
      description:
        "Com o fechamento do prédio da cidade administrativa temos a possibilidade de trabalhar presencialmente no prédio da Fhemig ...",
      link: "fhemig",
      img: imgNotebook,
    },
    {
      title: "JABBER",
      description:
        "Bom, com a situação atual do prédio todos os servidores foram alocados em teletrabalho e com isso vem a utilização do Jabber ...",
      link: "jabber",
      img: imgTelphone,
    },
    {
      title: "Siga-me",
      description:
        "O sistema 'SIGA-ME' é uma funcionalidade liberada pela PRODEMGE, para o uso enquanto durar a interdição dos Prédios Minas e Gerais ...",
      link: "sigaMe",
      img: imgSigame,
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
          slidesPerView={2}
          spaceBetween={30}
          mousewheel={true}
          pagination={{ clickable: true, }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper"
        >
          {dataList.items.map((item, index) => (
            <div className="row justify-content-center">
              {/* <!-- Cards Problemas T.I  --> */}
              <SwiperSlide>
                <div className="col-md-12" key={index} data-aos="fade-up">
                  <Link to={item.link} class="text-decoration-none">
                    <div className="link-content mb-5 mt-5">
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
