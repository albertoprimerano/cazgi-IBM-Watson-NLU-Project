import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let emotionsAsArray = Object.entries(this.props.emotions);   
        const result = emotionsAsArray.map((line) => { 
            
            return <tr><td>{line[0]}</td><td>{line[1]}</td></tr>}
            ) 
        return (  
        <div>
          {/*You can remove this line and the line below. */}
          <table className="table table-bordered">
            <tbody>
            {
               result     
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
