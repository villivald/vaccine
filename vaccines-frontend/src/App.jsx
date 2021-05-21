import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About";
import VaccineList from "./components/VaccineList";
import Info from "./components/Info";
import Solar from "./components/Solar";
import Antiqua from "./components/Antiqua";
import Zerpfy from "./components/Zerpfy";
import vaccineService from "./services/vaccine";

const App = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const initialVaccines = await vaccineService.getAll();
      setVaccines(initialVaccines);
    };
    fetchData();
  }, []);

  const vaccineAmount = (type, month) => {
    return vaccines
      .filter((vaccine) => vaccine.vaccine === type)
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`)).length;
  };

  const data = [
    {
      name: "January",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "01")}`,
      Antiqua: `${vaccineAmount("Antiqua", "01")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "01")}`,
    },
    {
      name: "February",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "02")}`,
      Antiqua: `${vaccineAmount("Antiqua", "02")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "02")}`,
    },
    {
      name: "March",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "03")}`,
      Antiqua: `${vaccineAmount("Antiqua", "03")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "03")}`,
    },
    {
      name: "April",
      SolarBhuddica: `${vaccineAmount("SolarBuddhica", "04")}`,
      Antiqua: `${vaccineAmount("Antiqua", "04")}`,
      Zerpfy: `${vaccineAmount("Zerpfy", "04")}`,
    },
  ];

  return (
    <Router>
      <div>
        <nav>
          <div style={{ display: "flex", gap: "15px" }}>
            <p>
              <Link to="/">Home</Link>
            </p>
            <p>
              <Link to="/vaccinelist">Vaccine List</Link>
            </p>
            <p>
              <Link to="/about">About</Link>
            </p>
          </div>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/solar">
            <Solar vaccines={vaccines} data={data} />
          </Route>
          <Route path="/antiqua">
            <Antiqua vaccines={vaccines} data={data} />
          </Route>
          <Route path="/zerpfy">
            <Zerpfy vaccines={vaccines} data={data} />
          </Route>
          <Route path="/vaccinelist">
            <VaccineList vaccines={vaccines} />
          </Route>
          <Route path="/">
            <Info vaccines={vaccines} data={data} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
