import uuid from 'node-uuid';
import alt from "../lib/alt";
import NoteActions from '../actions/NoteActions'

class NoteStore{
  constructor(){
    this.bindActions(NoteActions);  //映射每一个方法，通过名称映射。
    this.notes=[];
  }
  create(note){
    const notes=this.notes;
    note.id=uuid.v4();
    this.setState({
      notes:notes.concat(note)
    });
  }

  update(updateNote){
    const notes=this.notes.map(note=>{
      if(note.id === updateNote.id){
        return Object.assign({},note,updateNote);   //es6 features
      }else{
        return note;
      }
    });
    this.setState({notes});    //es6 features
  }


  delete(id){
    this.setState({
      notes:this.notes.filter(note => note.id!==id)
    });
  }
}
export default alt.createStore(NoteStore,'NoteStore');
