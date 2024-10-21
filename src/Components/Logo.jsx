import logoWithBg from "../Assets/logoWithoutBg.png";

const Logo = () => {
  // return (
  //   <div className="flex flex-row font-extrabold  border-2 border-red-600 text-slate-300">
  //     <p className="bg-red-600 p-1">TECH</p>
  //     <p className="p-1">SPRINT</p>
  //   </div>
  // );

  return <img className="" src={logoWithBg} alt="TechSprint" />;
};

export default Logo;
