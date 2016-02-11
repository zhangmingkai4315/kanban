import React from 'react';
import { DragSource,DropTarget} from 'react-dnd';
import itemTypes from '../constants/itemTypes';

const noteSource={

  beginDrag(props) {
    return {
    	id:props.id
    };
  },
  isDragging(props,monitor){
  	return props.id===monitor.getItem().id;
  }

}



const noteTarget={
	hover(targetProps,monitor){
		const sourceProps=monitor.getItem();
		const sourceId=sourceProps.id;
		const targetId=targetProps.id;
		if(sourceId!==targetId)
			targetProps.onMove({sourceId,targetId});
	}
}

@DragSource(itemTypes.NOTE,noteSource,(connect,monitor)=>({
	connectDragSource:connect.dragSource(),
	isDragging:monitor.isDragging()
}))
@DropTarget(itemTypes.NOTE,noteTarget,(connect)=>({
	connectDropTarget:connect.dropTarget()
}))


export default class Note extends React.Component{

  render(){
  	const {connectDragSource,connectDropTarget,editing,id,isDragging,onMove,...props}=this.props;
  	const dragSource=editing?a=>a:connectDragSource;
    return connectDragSource(connectDropTarget(
    	<li style={{opacity:isDragging?0:1}} {...this.props}>{this.props.children}</li>
    	))
  }
}