import AltContainer from 'alt-container';
import React from "react";
import Notes from "./Notes.jsx";
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore";
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';

export default class Lane extends React.Component{

  constructor(props){
      super(props);
      // this.state=NoteStore.getNotesByIds(props.lane.notes);
  };
  componentDidMount(){
       NoteStore.listen(this.storeChange);
  };
  componentWillUnMount (){
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
        <div className="lane-header" onClick={this.activeLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable className="lane-name"
                    editing={lane.editing}
                    onEdit={this.editName}
                    value={lane.name}/>
          <div className="lane-delete">
            <button onClick={this.deleteLane}>Delete</button>
          </div>
          <Notes notes={notes} 
                 onValueClick={this.activeNoteEdit} 
                 onEdit={this.editNote} 
                 onDelete={this.deleteNote}/>
        </div>
      </div>
    )
  };
  editName=(name)=>{
    let laneId=this.props.lane.id;
    LaneActions.update({id:laneId,name,editing:false});
    console.log(`Editing lane name using ${name}`);
  };

  deleteLane=()=>{
    let laneId=this.props.lane.id;
    LaneActions.delete(laneId);
    console.log(`Delete lane : ${laneId}`);
  };

  activeLaneEdit=()=>{
    let laneId=this.props.lane.id;
    LaneActions.update({id:laneId,editing:true});
    console.log(`Active lane ${laneId} edit`);
  };
  activeNoteEdit=(id)=>{
    NoteActions.update({id,editing:true});
    console.log(`Active Note ${id} edit`);
  };
    valueClick=()=>{
      console.log(arguments);
    };
    addNote=(e)=>{
      const laneId=this.props.lane.id;
      const note=NoteActions.create({task:'New Task'});
      LaneActions.attachToLane({noteId:note.id,laneId});
    };
    editNote(id,task){
      NoteActions.update({id,task,editing:false});
    };
    deleteNote=(noteId,e)=>{
      e.stopPropagation();
      const laneId=this.props.lane.id;
      LaneActions.detachFromLane({laneId,noteId});
      NoteActions.delete(id);
    };
}
