import { Route, Routes, Link, BrowserRouter as Router, useNavigate ,useLocation } from 'react-router-dom';
import { React, useState } from 'react';
import Index from './content/index';
import Form from './content/form';

function App() {
  const [cUrl, setcUrl] = useState(window.location.pathname);

  const ChangeRoute = (urlroute) => {
		setcUrl(urlroute)
	}

  return (
    <div>
      <div class="p-3 h2 font-weight-bold text-center">
        Simple CRUD with React-Node-Knex
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Index cUrl={cUrl} />} />
          <Route exact path="/:status/:id" element={<Form cUrl={cUrl} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
