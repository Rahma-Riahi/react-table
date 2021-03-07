
import './App.css';
import Table from './components/Table';
import Particles from 'react-particles-js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {

  
  return (
    <div  >
     <Router>
     <Particles
      style={{ position: "absolute" , backgroundColor:'#18a3b6', height:'100vh'}}
  
      params={{
        particles: {
          color: {
            value: "#fff"
          },
          line_linked: {
            color: {
              value: "#000000"
            }
          },
          number: {
            value: 123,
            density: {
              enable: true,
              value_area: 789.1850086415761
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          }
        }
      }}
     />
      <div className='table__container'>
        
        
       <Table/>
      </div>
    </Router> 
   
   
    </div>
  );
}

export default App;
