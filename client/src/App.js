import { Routes, Route } from 'react-router-dom'
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Titles from './components/titles/titles.component';
import TitleDetail from './components/title-detail/title-detail.component';
import './App.css';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home />}/>
        <Route path="titles" element={<Titles />}/>
        <Route path="titles/:tconst" element={<TitleDetail />}/>
      </Route>
    </Routes>
  );
}

export default App;
