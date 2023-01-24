import { toggleCheckItem } from '../api'
import "./styles.css"

export default function BoardItem(props : {id:string ,text: string}) {
  const { id, text } = props;
  const handleOnClick = () => {
    toggleCheckItem(id);
  }

  return (
    <div className="board-item-container">
      <div className="board-item" onClick={handleOnClick}>{text}</div>
    </div>
  )
}
