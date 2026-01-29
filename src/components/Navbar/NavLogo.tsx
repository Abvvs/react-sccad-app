import sccad from "../../assets/sccad_persona.svg"
import sccad_letras from "../../assets/sccad_letras.svg"

const NavLogo = () => {
  return (
    <a className="flex items-center gap-3" href="/">
      <img
        src={sccad}
        alt="Logo SCCAD topografia"
        className="w-8 h-8 md:w-14 md:h-14" 
      />
      <img
        src={sccad_letras}
        alt="Logo SCCAD topografia"
        className="w-8 h-8 md:w-15 md:h-15" 
      />
    </a>
  );
};

export default NavLogo;
