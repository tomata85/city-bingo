import { BoardItemType } from "../types";
import "./styles.css"

export default function BoardItem(props : {item: BoardItemType, onClick: (id:string)=>void }) {
  const { item, onClick } = props;

  const handleOnClick = () => {
    onClick(item.id);
  }

  return (
    <div className="board-item-container">
      <div className="board-item" onClick={handleOnClick}>{item.text}</div>
    </div>
  )
}
