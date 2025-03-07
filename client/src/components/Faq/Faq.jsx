import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavbarComp from "../Navbar/NavbarComp";

export default function Faq() {
  return (
    <div width="100%" minHeight="100%">
      <NavbarComp />
      <h1 className="flex bg-semilight justify-center font-semibold pt-3 text-4xl text-dark p-6">
        FAQ - Preguntas frecuentes
      </h1>
      <div className="flex flex-col items-center bg-semilight text-black">
        <div class="flex flex-col justify-center items-center max-w-4xl px-4">
          <div defaultIndex={[0]} allowMultiple>
            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">¿Qué es HiTalent?</h1>
                  </div>
                  <div />
                </div>
              </h3>
              <div pb={4}>
                <p>
                  Nuestra mision es conectar personas que deseen <b>aprender</b>{" "}
                  algo sin necesidad de recurrir a cursos muy caros, acortando
                  la distancia entre personas de todo el mundo que tengan estas
                  habilidades y esten dispuestas a <b>enseñarlas</b>.
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">¿Qué buscamos?</h1>
                  </div>
                  <div />
                </div>
              </h3>
              <div pb={4}>
                <p>
                  Buscamos personas talentosas y que tengan ganas de compartir
                  su conocimiento con los demás. Así como gente con inagotable
                  interés en aprender.
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">¿Cómo empiezo?</h1>
                  </div>
                </div>
              </h3>
              <div pb={4}>
                <p>
                  Lo primero que debes hacer, tanto si quieres aprender o
                  enseñar, es <b>registrarte.</b> Esto puedes hacerlo con tu
                  cuenta de Google o simplemente con tu dirección correo
                  electrónico. Despueś deberás <b>verificarla</b> y ¡listo! Ya
                  puedes comenzar. <br /> <br />
                  Una vez registrado tendrás a tu alcance{" "}
                  <b>cualquier talento</b>, puedes filtrarlos según los
                  criterios que se ajusten mejor a tu búsqueda.
                  <br /> <br /> Si ofrecés algún talento, crea una publicación
                  facilitando la información necesaria, sin ningún tipo de
                  costo.
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">
                      ¿Cuáles son los beneficios?
                    </h1>
                  </div>
                </div>
              </h3>
              <div pb={4}>
                <p>
                  Todas las transacciones realizadas por medio de la plataforma
                  son <b>100% seguras</b>. Ya que a diferencia de otros sitios,
                  el intercambio monetario sólo será despachado hasta que ambas
                  partes se encuentren totalmente de acuerdo y conformes.
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">
                      ¿Cómo funciona el servicio?
                    </h1>
                  </div>
                </div>
              </h3>
              <div pb={4}>
                <p>
                  En HiTalent nos encargamos de acercar a la gente interesada en
                  aprender nuevas habilidades y quienes ya las dominan. Una vez
                  que la enseñanza de ha llevado a cabo, quien aprendió dicho
                  talento, puede hacer una reseña sobre su experiencia. Por lo
                  tanto, quienes enseñen de una mejor manera, podrán aspirar a
                  un mayor número de aprendizes.
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">
                      ¿Cuáles son los métodos de pago que acepta HiTalent?
                    </h1>
                  </div>
                </div>
              </h3>
              <div pb={4}>
                <p>
                  La forma por defecto para hacer transferencias monetarias es{" "}
                  <b>Mercadopago</b>, ya que esta plataforma permite agregar
                  cualquier tipo de <b>tarjeta de débito o crédito</b>, así como
                  usar <b>MercadoCrédito.</b>
                </p>
              </div>
            </div>

            <div>
              <h3>
                <div>
                  <div flex="1" class="font-semibold" textAlign="left">
                    <h1 className="font-semibold text-xl">
                      ¿Por qué las cuotas son definidas en dólares?
                    </h1>
                  </div>
                </div>
              </h3>
              <div pb={4}>
                <p>
                  Los precios son fíjados en dólares ya que es la moneda más
                  conocida y usada en la mayoría de los países. ¡Existe mucha
                  gente talentosa y llena de ganas de aprender alrededor de todo
                  el mundo!
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-semibold text-3xl pt-8">
              Si tenés alguna duda, podés escribirla a: hitalent09@gmail.com
            </h1>
          </div>
          <div className="flex justify-center m-6">
            <Link to="/home">
              <button class="flex justify-center p-2 mb-4 bg-dark rounded-lg text-lg text-white w-96 hover:scale-110 duration-300 ease-in-out">
                Volver
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
