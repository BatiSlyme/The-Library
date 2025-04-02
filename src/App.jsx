import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from "./components/About/About"
import Catalogue from "./components/Catalogue/Catalogue"
import Details from "./components/Details/Details"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import PersonalLibrary from "./components/PersonalLibrary/PersonalLibrary"
import UserProfile from "./components/UserProfile/UserProfile"
import Register from "./components/Register/Register"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/personal-library" element={<PersonalLibrary />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/details" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
