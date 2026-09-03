import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <BrowserRouter basename="/joe-portfolio">
      <ScrollToTop />
      <div id="top">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
