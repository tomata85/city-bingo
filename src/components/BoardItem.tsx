import { toggleCheckItem } from '../api'
import "./styles.css"

export default function BoardItem(props : {item: [string, string]}) {
  const { item } = props;
  const handleOnClick = () => {
    toggleCheckItem(item[0]);
  }

  return (
    <div className="board-item-container">
      <div className="board-item" onClick={handleOnClick}>{item[1]}</div>
    </div>
  )
}
