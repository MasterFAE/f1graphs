import Head from "next/head";
import Image from "next/image";
import styles from "../styles/RaceCard.module.css";
import Link from "next/link";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Box, GridItem, Select } from "@chakra-ui/react";

type tooltipParam = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const CustomTooltip = (param: tooltipParam) => {
  const { active, payload, label } = param;
  if (active && payload && payload.length) {
    let driverName2;
    let driverTime2;
    let driverName1 = payload[0].payload.driver.toUpperCase().slice(0, 3);
    if (payload[1] && payload[1].payload) {
      driverName2 = payload[1].payload.driver.toUpperCase().slice(0, 3);
      driverTime2 = payload[1].payload.time_label;
    } else {
      driverName2 = null;
      driverTime2 = " ";
    }
    return (
      <div className={styles.customtooltip}>
        <p className={styles.customtooltipheader}>{`Lap ${label}`}</p>
        <p
          className="intro"
          style={{ color: changeColors(payload[0].payload.driver) }}>{`${driverName1}: ${payload[0].payload.time_label}`}</p>
        {!driverName2 ? (
          <></>
        ) : (
          <p className="intro" style={{ color: changeColors(payload[1].payload.driver) }}>{`${driverName2}: ${driverTime2}`}</p>
        )}
      </div>
    );
  }

  return null;
};

const changeColors = (driver) => {
  let color = "#005AFF";
  if (driver == "leclerc" || driver == "sainz") color = "#DC0000";
  else if (driver == "max_verstappen" || driver == "perez") color = "#0600EF";
  else if (driver == "hamilton" || driver == "russell") color = "#00D2BE";
  else if (driver == "norris" || driver == "ricciardo") color = "#FF8700";
  else if (driver == "ocon" || driver == "alonso") color = "#0090FF";
  else if (driver == "gasly" || driver == "tsunoda") color = "#2B4562";
  else if (driver == "bottas" || driver == "zhou") color = "#900000";
  else if (driver == "mick_schumacher" || driver == "kevin_magnussen") color = "#a82b2b";
  else if (driver == "vettel" || driver == "stroll") color = "#006F62";
  else if (driver == "latifi" || driver == "albon") color = "#005AFF";
  return color;
};

var stored_data = [];

type props = {
  rowSpan?: number;
  colSpan?: number;
};
export default function RaceCard(props: props) {
  const [firstDriver, setfirstDriver] = useState("");
  const [secondDriver, setsecondDriver] = useState("");
  const [firstDriverColor, setfirstDriverColor] = useState("#00D2BE");
  const [secondDriverColor, setsecondDriverColor] = useState("#DC0000");
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [range, setrange] = useState([0, 180]);
  useEffect(() => {
    fetch("./api/hello").then((resp) => {
      resp.json().then((res) => {
        stored_data = res;
        // setdata1(res.filter((i) => i.driver === firstDriver));
        // setdata2(res.filter((i) => i.driver === secondDriver));
        // calculateRange(res);
      });
    });
  }, []);

  const createGraph = () => {
    if (stored_data.length < 1) {
      fetch("./api/hello").then((resp) => {
        resp.json().then((res) => {
          stored_data = res;
          setdata1(res.filter((i) => i.driver === firstDriver));
          setdata2(res.filter((i) => i.driver === secondDriver));
          calculateRange(res);
        });
      });
    }
    setfirstDriverColor(changeColors(firstDriver));
    setsecondDriverColor(changeColors(secondDriver));
    changeColors(2);
    setdata1(stored_data.filter((i) => i.driver === firstDriver));
    setdata2(stored_data.filter((i) => i.driver === secondDriver));
  };

  const calculateRange = (res) => {
    res.sort(function (a, b) {
      return a["time"] > b["time"];
    });
    setrange([Math.round(res[0] - 5), Math.round(res[res.length - 1] + 5)]);
  };

  return (
    <GridItem rowSpan={props.rowSpan || 1} colSpan={props.colSpan || 1} boxShadow="md" rounded={"lg"} h={"100%"}>
      <div className={styles.cardheader}>
        <Link href="/">#1 - Bahrain GP</Link>
      </div>
      <div className={styles.cardbody}>
        <ResponsiveContainer width={"100%"} height={600}>
          <LineChart margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <Tooltip content={<CustomTooltip />} />
            {<Line type="monotoneX" dataKey={"time"} data={data1} stroke={firstDriverColor} />}
            {<Line type="monotoneX" dataKey={"time"} data={data2} stroke={secondDriverColor} />}
            <CartesianGrid stroke="#ccc" strokeDasharray="10 5" />
            <XAxis allowDuplicatedCategory={false} dataKey="lapNo" tickFormatter={(value) => "Lap " + value} />
            <YAxis
              domain={[range[0], range[1]]}
              allowDuplicatedCategory={false}
              dataKey="time"
              tickFormatter={(value) => value}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className={styles.cardinfo}>
          <span>
            <Select placeholder="Select First Driver" value={firstDriver} onChange={(e) => setfirstDriver(e.target.value)}>
              <option value="hamilton">Lewis Hamilton</option>
              <option value="russell">George Russel</option>
              <option value="max_verstappen">Max Verstappen</option>
              <option value="perez">Sergio Perez</option>
              <option value="leclerc">Charles Leclerc</option>
              <option value="sainz">Carlos Sainz</option>
              <option value="norris">Lando Norris</option>
              <option value="ricciardo">Daniel Ricciardo</option>
              <option value="ocon">Esteban Ocon</option>
              <option value="alonso">Fernando Alonso</option>
              <option value="gasly">Pierre Gasly</option>
              <option value="tsunoda">Yuki Tsunoda</option>
              <option value="bottas">Valtteri Bottas</option>
              <option value="zhou">Guanyhou Zhou</option>
              <option value="mick_schumacher">Mick Schumacher</option>
              <option value="kevin_magnussen">Kevin Magnussen</option>
              <option value="vettel">Sebastian Vettel</option>
              <option value="stroll">Lance Stroll</option>
              <option value="latifi">Nicholas Latifi</option>
              <option value="albon">Alex Albon</option>
            </Select>
          </span>
          <span>
            <Select placeholder="Select Second Driver" value={secondDriver} onChange={(e) => setsecondDriver(e.target.value)}>
              <option value="hamilton">Lewis Hamilton</option>
              <option value="russell">George Russel</option>
              <option value="max_verstappen">Max Verstappen</option>
              <option value="perez">Sergio Perez</option>
              <option value="leclerc">Charles Leclerc</option>
              <option value="sainz">Carlos Sainz</option>
              <option value="norris">Lando Norris</option>
              <option value="ricciardo">Daniel Ricciardo</option>
              <option value="ocon">Esteban Ocon</option>
              <option value="alonso">Fernando Alonso</option>
              <option value="gasly">Pierre Gasly</option>
              <option value="tsunoda">Yuki Tsunoda</option>
              <option value="bottas">Valtteri Bottas</option>
              <option value="zhou">Guanyhou Zhou</option>
              <option value="mick_schumacher">Mick Schumacher</option>
              <option value="kevin_magnussen">Kevin Magnussen</option>
              <option value="vettel">Sebastian Vettel</option>
              <option value="stroll">Lance Stroll</option>
              <option value="latifi">Nicholas Latifi</option>
              <option value="albon">Alex Albon</option>
            </Select>
          </span>
        </div>
        <button className={styles.cardinfobutton} onClick={(e) => createGraph()}>
          Create
        </button>
      </div>
    </GridItem>
  );
}
