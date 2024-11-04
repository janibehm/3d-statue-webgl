export default function ScrollContent() {
    return (
      <main className="
        absolute w-full text-white z-[1] grid grid-cols-12 pointer-events-auto
        top-[70vh] 
        md:w-[30%] md:top-[400px] md:left-[5%]
      ">
        <blockquote className="
          col-span-12 px-4 mb-spacing
          sm:px-8 sm:col-span-10 sm:col-start-2
          md:col-start-1
        ">
          <p className="text-white bg-transparent text-4xl inline leading-none">
            Rakennetaan sinulle jotain upeaa!
          </p>
        </blockquote>
  
        <div className="h-[25vh] col-span-12"></div> {/* spacer */}
  
        <section className="
          col-span-12 px-4 bg-dark-bg text-base leading-relaxed mb-spacing
          sm:px-8 sm:col-span-10 sm:col-start-2
          md:text-xl
        ">
          <h2 className="font-['exo'] font-bold py-4 text-2xl">Miksi hankkia kotisivut juuri meiltä?</h2>
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Brändin Yksilöllisyys</h3>
            <p className="mb-6">Laadukkaat kotisivut mahdollistavat brändisi ainutlaatuisen ilmeen ja viestin esittämisen. Voimme räätälöidä sivuston ulkoasun ja sisällön vastaamaan yrityksesi arvoja ja tavoitteita.</p>
          </div>
  
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Käyttäjäkokemus</h3>
            <p className="mb-6">Sivut voidaan optimoida tarjoamaan käyttäjäystävällinen kokemus. Tämä tarkoittaa intuitiivista navigointia, nopeita latausaikoja ja responsiivista designia, joka toimii hyvin kaikilla laitteilla.</p>
          </div>
  
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Skaalautuvuus</h3>
            <p className="mb-6">Kotisivut voidaan suunnitella siten, että ne kasvavat yrityksesi mukana. Voit lisätä uusia toimintoja, sivuja tai integraatioita ilman, että koko sivustoa tarvitsee rakentaa uusiksi.</p>
          </div>
  
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Kilpailuetu</h3>
            <p className="mb-6">Innovatiivinen design ja ainutlaatuinen sisältö voivat herättää asiakkaan mielenkiinnon ja houkutella valitsemaan juuri sinun yrityksesi.</p>
          </div>
  
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Hakusana optimointi</h3>
            <p className="mb-6">Hyvin suunniteltu rakenne ja SEO optimointi nostavat mahdollisuuksia nousta hakutuloksissa, mikä voi johtaa lisääntyneeseen liikenteeseen ja asiakaskuntaan.</p>
          </div>
  
          <div className="feature max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Ammattimaisuus</h3>
            <p className="mb-6">Laadukkaat kotisivut antavat yrityksestäsi ammattimaisen kuvan, mikä lisää luottamusta. Hyvin suunnitellut websivut voi tehdä eron asiakkaiden päätöksenteossa.</p>
          </div>
        </section>
  
        <section className="
          col-span-12 px-4 bg-dark-bg text-base leading-relaxed mb-spacing
          sm:px-8 sm:col-span-10 sm:col-start-2
          md:text-xl
        ">
          <h2 className="font-['Exo'] font-bold py-4 text-2xl">Kuinka prosessi toimii?</h2>
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Ideointi</h3>
            <p className="mb-6">Aloituspalaverissa käymme läpi yrityksesi viestintätyylin ja minkälaiset websivut tarvitset. Teemme graafisenilmeen yrityksellesi tämän perusteella.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Asiakaskartoitus</h3>
            <p className="mb-6">Kotisivuja tehdessä on tärkeää hahmottaa mikä on oleellista asiakkaan näkökulmasta. Esimerkiksi yhteydenotto ja varauskalenteri on hyvä olla helposti havaittavissa. Myös palveluiden tai informaation esilletuonti tietyssä järjestyksessä on tärkeää.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Suunnittelu</h3>
            <p className="mb-6">Teemme graafisenilmeen alkupalaverin pohjalta. Suunnittelemme myös verkkosivujen tyylin ja tuomme tarvittavat kuvat ja muun median tässä vaiheessa projektia.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Kehitys</h3>
            <p className="mb-6">Kehitystyö tehdään perustuen graafiseen ilmeeseen. Lisäämme myös tarvittavat lisäosat, kuten kalenterivaraus järjestelmän, karttaupotuksen tai tekoäly asiakaspalvelijan sivustolle.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Testaus</h3>
            <p className="mb-6">Testausvaiheessa varmistamme, että sivusto skaalautuu hyvin mobiililla ja tietokoneella, sekä tarkistamme, että yhteydenotto lomake ja vastaavat lisäosat toimivat, kuten pitää. Voimme myös tehdä sivustolle vielä pieniä muutoksia tarvittaessa.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Julkaisu</h3>
            <p className="mb-6">Kun olet tyytyväinen julkaisemme kotisivusi ihmisten ilmoille! Varmistamme, että kaikki on kohdallaan ennen julkaisua. Jos haluat kuitenkin muuttaa jotain jälkikäteen se onnistuu toki.</p>
          </div>
  
          <div className="step max-w-[95%] mx-auto">
            <h3 className="font-['exo'] font-bold py-4 text-xl">Ylläpito</h3>
            <p className="mb-6">Sivuston julkaisun jälkeen voit valita myös ylläpidon sille. Ylläpito sisältää serverialustan kustannukset, sekä kuukausittaiset muutokset, jos haluat vaihtaa esimerkiksi kuvia tai tekstiä. Voit tottakai vaihtaa kuvia tai tekstiä myös itse
              ja esimerkiksi blogi tyylinen sivusto on mahdollista toteuttaa niin, että voit lisätä artikkeleita ilman koodausosaamista</p>
          </div>
        </section>
  
        <section className="
          col-span-12 px-4 text-base leading-relaxed mb-spacing
          sm:px-8 sm:col-span-10 sm:col-start-2
          md:text-xl
        ">
          <h2 className="font-['Exo'] font-bold py-4 text-2xl">Ota yhteyttä jo tänään.</h2>
        </section>
  
        <div className="h-[80vh] col-span-12"></div>
      </main>
    );
  }
  