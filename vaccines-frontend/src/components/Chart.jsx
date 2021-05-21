import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Treemap,
} from "recharts";

const Chart = ({ vaccines, data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26"];

  const vaccineAmountByType = (type) => {
    return vaccines.filter((vaccine) => vaccine.vaccine === type).length;
  };
  const vaccineAmountByArea = (area) => {
    return vaccines.filter((vaccine) => vaccine.healthCareDistrict === area)
      .length;
  };

  const vaccineDataByType = [
    {
      name: "SolarBuddhica",
      value: vaccineAmountByType("SolarBuddhica"),
    },
    {
      name: "Antiqua",
      value: vaccineAmountByType("Antiqua"),
    },
    {
      name: "Zerpfy",
      value: vaccineAmountByType("Zerpfy"),
    },
  ];

  const vaccineDataByArea = [
    {
      name: "HYKS",
      value: vaccineAmountByArea("HYKS"),
    },
    {
      name: "KYS",
      value: vaccineAmountByArea("KYS"),
    },
    {
      name: "TAYS",
      value: vaccineAmountByArea("TAYS"),
    },
    {
      name: "TYKS",
      value: vaccineAmountByArea("TYKS"),
    },
    {
      name: "OYS",
      value: vaccineAmountByArea("OYS"),
    },
  ];

  return (
    <div>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="SolarBhuddica"
          stroke={COLORS[0]}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Antiqua"
          stroke={COLORS[1]}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Zerpfy"
          stroke={COLORS[2]}
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <div style={{ display: "flex", gap: "15px" }}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="SolarBhuddica" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="Antiqua" stackId="a" fill={COLORS[1]} />
          <Bar dataKey="Zerpfy" stackId="a" fill={COLORS[2]} />
        </BarChart>

        <PieChart width={400} height={400}>
          <Pie
            data={vaccineDataByType}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={`${vaccineDataByType.value}`}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <h2>Vaccines by Health Districts</h2>
      <Treemap
        width={400}
        height={200}
        data={vaccineDataByArea}
        dataKey="value"
        ratio={4 / 3}
        stroke="#fff"
        fill={COLORS[0]}
      />
    </div>
  );
};

export default Chart;
