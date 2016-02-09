import React from "react"

import uuid from "node-uuid";
import Notes from './Notes.jsx'


{/* 使用webpack组件直接自动安装 依赖 */}

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      notes:[
        {
         id: uuid.v4(),
         task: 'Learn Webpack'
       },
       {
         id: uuid.v4(),
         task: 'Learn React'
       },
       {
         id: uuid.v4(),
         task: 'Do laundry'
       }
      ]
    };
  };
  editNote=(id,task)=>{
    const notes=this.state.notes.map(note=>{
      if(note.id===id &&task){
        note.task=task;
      }
      return note;
    });
    this.setState({
      notes:notes
    });
  };

  addNote=()=>{
    this.setState({
      notes:this.state.notes.concat([{
        id:uuid.v4(),
        task:'new task'
      }])
    });
  };
  deleteNote=(id)=>{
    this.setState({
      notes:this.state.notes.filter(note=>note.id!==id)
    });
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
