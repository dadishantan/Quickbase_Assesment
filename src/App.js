
import Navbar from "./components/Navbar";
import React, {Component} from "react";
import { render } from "@testing-library/react";
import FieldBuilder from "./components/Form";
import "./styles.css";



class App extends Component{

  render() {
    return(
      <div className="App">
        <Navbar/> 
        <FieldBuilder />
      </div>
      
    )
  }
}


export default App;
