import React from "react"

import uuid from "node-uuid";
import Notes from './Notes.jsx'
import NoteActions from "../actions/NoteActions";
import NoteStore from "../stores/NoteStore"

{/* 使用webpack组件直接自动安装 依赖 */}

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state=NoteStore.getState();
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
  editNote=(id,task)=>{
    NoteActions.update({id,task});
  };


  addNote=()=>{
    NoteActions.create({
        task:'new task'
      });
  };
  deleteNote=(id)=>{
    NoteActions.delete(id);
  };
  render() {
    const notes=this.state.notes;
    return (
      <div>
         <button className="add-note" onClick={this.addNote}>Add note</button>
         <Notes notes={notes}  onDelete={this.deleteNote} onEdit={this.editNote}/>
      </div>

    );
  };
}
