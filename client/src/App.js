import { Aux } from './routes/Routes';
import './App.css';
import { searchTalent } from './actions/index';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
function App() {
  let dispatch = useDispatch();
  let ver1=useSelector(state=>state.misliceReducer.filteredTalents)
  console.log(ver1)
  useEffect(()=>{
    dispatch(searchTalent("Desarrollo web"))
  },[dispatch])
  return (
    <div>{ver1[0]?.title}</div>
  );
}

export default App;
