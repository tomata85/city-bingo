import { toggleCheckItem } from '../api'
import "./styles.css"

export default function BoardItem(props : {item: string}) {
  const { item } = props;
  const handleOnClick = () => {
    toggleCheckItem(item);
  }

  return (
    <div className="board-item-container">
      <div className="board-item" onClick={handleOnClick}>{item}</div>
    </div>
  )
}
