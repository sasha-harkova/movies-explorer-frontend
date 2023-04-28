import Promo from './Promo/Promo'
import Navtab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";


function Main() {
    return (
      <main>
        <Promo />
        <Navtab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    );
}
  
export default Main;