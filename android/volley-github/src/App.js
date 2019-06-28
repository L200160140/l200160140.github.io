import React from 'react';
import Langkah from "./Langkah"
import isiData from "./isi"
import demo_volley from "./demo_volley.mp4";

class App extends React.Component {
  constructor() {
      super()
      this.state = {
          isi: isiData
      }
  }
 
  render() {

    const langkahItem = this.state.isi.map(item => <Langkah key={item.step} item={item}/>)
      
      return (
            <React.Fragment>
              <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11">
                          <h1 className="mt-4 text-center">Android Volley</h1>

                          <h2>- Langkah-langkah : </h2>
                          {langkahItem}
                          <h2>- Demo Hasil : </h2> <br />
                          <video src={demo_volley} width="400" height="500" controls="controls" />
                          
                    </div>
                </div>
                
              </div>

            </React.Fragment>

      )    
  }
}

export default App