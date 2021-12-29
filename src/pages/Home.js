import './Home.css';
import logo from './images/jwl-logo-large.png';

const Home = () => {
  return (
    <div className="home">
      <div className="main-logo">
        <img src={logo} />
      </div>
      <div>
        <h1>WELCOME TO JEWEL</h1>
      </div>
      <div>
        An eCommerce app that utilizes HTML, CSS, Javascript with an Express
        backend and a React frontend
      </div>
    </div>
  );
};

export default Home;
