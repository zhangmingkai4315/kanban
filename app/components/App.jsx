import React from "react"

import uuid from "node-uuid";
import Notes from './Notes.jsx'
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore"
import AltContainer from 'alt-container';


import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';



{/* 使用webpack组件直接自动安装 依赖 */}
@DragDropContext(HTML5Backend)
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state=LaneStore.getState();
  };
  componentDidMount(){
    LaneStore.listen(this.laneChange);
  };

  componentWillUnMount(){
    LaneStore.unlisten(this.laneChange);
  };
  laneChange=(state)=>{
    this.setState(state);
  };
  render(){
    const lanes=this.state.lanes||[];

    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>Add New Lane</button>
        <Lanes lanes={lanes}/>
      </div>
    )
  }
  addLane=()=>{
    LaneActions.create({name:'New lane'});
  };
}
