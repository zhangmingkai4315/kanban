import uuid from 'node-uuid';
import alt from "../lib/alt";
import NoteActions from '../actions/NoteActions'

class NoteStore{
  constructor(){
    this.bindActions(NoteActions);  //映射每一个方法，通过名称映射。
    this.notes=[];
    this.exportPublicMethods({
      getNotesByIds:this.getNotesByIds.bind(this)
    });
  }

  //公共方法 从整个数据仓库中获得需要的数据 输入为一组数据id,返回该id对应的内容

    getNotesByIds(ids) {
   // 1. Make sure we are operating on an array and
   // map over the ids
   // [id, id, id, ...] -> [[Note], [], [Note], ...]
   return (ids || []).map(
     // 2. Extract matching notes
     // [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
     id => this.notes.filter(note => note.id === id)
   // 3. Filter out possible empty arrays and get notes
   // [[Note], [], [Note]] -> [[Note], [Note]] -> [Note, Note]
   ).filter(a => a.length).map(a => a[0]);
 }
  
  create(note){
    const notes=this.notes;
    note.id=uuid.v4();
    this.setState({
      notes:notes.concat(note)
    });
    return note;
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
