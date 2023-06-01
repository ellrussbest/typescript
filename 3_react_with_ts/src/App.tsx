import './App.css';
import { GenericFunctionalComponents } from './props/GenericFunctionalComponents';
import GuestList from './state/GuestList';

function App() {
  return (
    <>
      <GuestList />
      <GenericFunctionalComponents data={{name: 'John', age: 30}} />
    </>
  );
}

export default App;
