import { toggleCheckItem } from '../api'

export default function BoardItem(props : {item: string}) {
  const { item } = props;
  const handleOnClick = () => {
    toggleCheckItem(item);
  }

  return (
    <button onClick={handleOnClick}>{item}</button>
  )
}
