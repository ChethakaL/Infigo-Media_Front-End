import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Screens
import Layout from "./screens/Layout";
import Home from "./screens/Home";
import Content from "./screens/Content";
import Login from "./screens/Login";
import Add from "./screens/Product/Add";
import Manage from "./screens/Product/Manage";
import Message from "./screens/Message";
import Customize from "./screens/Customize";
import Posting from "./screens/Posting";
import Scheduler from "./screens/Scheduler";
import Orders from "./screens/Product/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="content" element={<Content/>}></Route>
          <Route path="customize" element={<Customize/>}></Route>
          <Route path="message" element={<Message/>}></Route>
          <Route path="product/add" element={<Add/>}></Route>
          <Route path="product/manage" element={<Manage/>}></Route>
          <Route path="product/orders" element={<Orders/>}></Route>
          <Route path="post" element={<Posting/>}></Route>
          <Route path="scheduler" element={<Scheduler/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
