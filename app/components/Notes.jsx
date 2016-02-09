import React, { PropTypes } from 'react'
import Note from './Note.jsx'

export default class Notes  extends React.Component{


  render () {
    const notes=this.props.notes;
    return (
      <ul className="notes">{notes.map(note =>
      <li className="note" key={note.id}>
        <Note task={note.task}  onDelete={this.props.onDelete.bind(null,note.id)} onEdit={this.props.onEdit.bind(null,note.id)} />
      </li>
    )}</ul>
    )
  }
}
