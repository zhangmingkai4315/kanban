import React, { PropTypes } from 'react'
import Note from './Note.jsx'
import Editable from './Editable';
export default class Notes  extends React.Component{


  render () {
    const notes=this.props.notes;
    return (
      <ul className="notes">{notes.map(note =>
      <li className="note" key={note.id}>
        <Editable 
          value={note.task}  
          editing={note.editing} 
          onValueClick={this.props.onValueClick.bind(null,note.id)}
          onDelete={this.props.onDelete.bind(null,note.id)} 
          onEdit={this.props.onEdit.bind(null,note.id)} />
      </li>
    )}</ul>
    )
  }
}
