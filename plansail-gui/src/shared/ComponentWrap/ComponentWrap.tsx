// import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const ComponentWrap = (props: any) => {
  return (
    <>
      <Sidebar>
      {props.children}
      </Sidebar>
      {/* <Footer /> */}
    </>
  );
};

export default ComponentWrap;
