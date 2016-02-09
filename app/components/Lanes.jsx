import React, { PropTypes } from 'react'
import Lane from "./Lane.jsx"
class Lanes extends React.Component{
  render () {
    const lanes=this.props.lanes||[];
    return (
        <div className="lanes">{
            lanes.map((lane)=>
            <Lane className="lane" key={lane.id} lane={lane}/>)
          }
        </div>
    );
  }
}

export default Lanes
