import "./styles.css"

export default function BoardItem(props : {id: string, text: string, onClick: (id:string)=>void }) {
  const { id, text, onClick } = props;

  const handleOnClick = () => {
    onClick(id);
  }

  return (
    <div className="board-item-container">
      <div className="board-item" onClick={handleOnClick}>{text}</div>
    </div>
  )
}
