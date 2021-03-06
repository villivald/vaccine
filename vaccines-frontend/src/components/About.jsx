import React from "react";
import Link from "@material-ui/core/Link";
import aboutPic from "../images/about.svg";

const About = () => {
  return (
    <div className="aboutContainer">
      <img src={aboutPic} height="150" style={{ marginTop: "20px" }} />

      <h2>
        App live on <Link href="https://vaccine2021.vercel.app/">Vercel</Link>
      </h2>
      <h2>
        API live on{" "}
        <Link href="https://polar-basin-63646.herokuapp.com/api/vaccinations">
          Heroku
        </Link>
      </h2>
      <h2>
        Source Code on{" "}
        <Link href="https://github.com/villivald/vaccine">GitHub</Link>
      </h2>

      <h2>Made with:</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          justifyItems: "center",
          gap: "15px",
        }}
      >
        <p>
          <Link href="https://reactjs.org/">React</Link>
        </p>
        <p>
          <Link href="https://nodejs.org/en/">Node.js</Link>
        </p>
        <p>
          <Link href="https://vitejs.dev/">Vite</Link>
        </p>
        <p>
          <Link href="https://reactrouter.com/">React Router</Link>
        </p>
        <p>
          <Link href="https://material-ui.com/">Material UI</Link>
        </p>
        <p>
          <Link href="http://reactchartjs.github.io/react-chartjs-2/#/">
            react-chartjs-2
          </Link>
        </p>
        <p>
          <Link href="https://www.drawkit.io/">Drawkit</Link>
        </p>
        <p>
          <Link href="https://heroku.com/">Heroku</Link>
        </p>
        <p>
          <Link href="https://vercel.com/">Vercel</Link>
        </p>
      </div>
    </div>
  );
};

export default About;
