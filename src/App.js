import ListTable from "./comp/table"
import InpForm from "./comp/inpform"
import './App.css'
function App() {
  return (
    <>
    <div className="App">
    <div id="head">
    <h1>To-Do App</h1>
    </div>
    <div className="App-header">
    <InpForm/>
    </div>
    <div id="table">
    <ListTable/>
    </div>
    </div>
    </>
  );
}

export default App;
