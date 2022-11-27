import ListTable from "./comp/table"
import InpForm from "./comp/inpform"
import './App.css'
function App() {
  return (
    <>
    <div id="head">
    <h1>To-Do App</h1>
    </div>
    <InpForm/>
    <div id="table">
    <ListTable/>
    </div>
    </>
  );
}

export default App;
