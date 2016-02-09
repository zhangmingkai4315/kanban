import AltContainer from 'alt-container';
import React from "react";
import Notes from "./Notes.jsx";
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore";
import LaneActions from '../actions/LaneActions'

export default class Lane extends React.Component{

  constructor(props){
      super(props);
      // this.state=NoteStore.getNotesByIds(props.lane.notes);
  };
  componentDidMount(){
       NoteStore.listen(this.storeChange);
  };
  componentWillMount(){
       NoteStore.unlisten(this.storeChange);
  };
  storeChange=(state)=>{
       this.setState(state);
  };
  render(){

    const {lane,...props}=this.props;
    const notes=NoteStore.getNotesByIds(lane.notes);
    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
      </div>
    )
  }
    addNote=(e)=>{
      const laneId=this.props.lane.id;
      const note=NoteActions.create({task:'New Task'});
      LaneActions.attachToLane({noteId:note.id,laneId});
    };
    editNote(){
      NoteActions.update({id,task});
    };
    deleteNote=(noteId,e)=>{
      e.stopPropagation();
      const laneId=this.props.lane.id;
      LaneActions.detachFromLane({laneId,noteId});
      NoteActions.delete(id);
    };
}
