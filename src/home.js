import './App.css';
import {Link} from "react-router-dom";
function Home() {
  
  return (
    <>
    <div className="main">
      <div>
        <Link to="/Register" id="getstarted">Get Started</Link>
      </div>
    </div>
    </>
  );
}

export default Home;
