import { ReactNode, useEffect, useState } from "react";
import "./App.css";

const Row: React.FC<{
  children: ReactNode;
  data: timeData;
}> = (props) => {
  const columns = [];
  for (let i = 0; i < Object.keys(props.data).length; i++) {
    columns.push(<td key={i} />);
  }
  return (
    <tr>
      <td>{props.children}</td>
      {columns}
    </tr>
  );
};

const Table: React.FC<{
  data: timeData;
}> = (props) => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(<Row key={i} data={props.data}>{`${i + 1}時`}</Row>);
  }
  return (
    <div className="table_root">
      <table className="time">
        <thead className="tableHead">
          <th className="table"></th>
          {Object.keys(props.data).map((e) => (
            <th key={e}>{e}</th>
          ))}
        </thead>
        <tbody>{times}</tbody>
      </table>
      {Object.keys(props.data).map((person, count) => (
        <>
          {props.data[person].map((e, t) => (
            <div
              className="point"
              key={t}
              data-time={new Date(Number(e) * 1000).toLocaleTimeString()}
              style={{
                top: `${
                  new Date(Number(e) * 1000).getHours() * 60 +
                  new Date(Number(e) * 1000).getMinutes() -
                  10
                }px`,
                left: `${(count + 1) * 80 + 40}px `,
              }}
            ></div>
          ))}
        </>
      ))}
    </div>
  );
};
type timeData = {
  [key: string]: string[];
};

function dateToString(date: Date) {
  return `${date.getFullYear()}-${("00" + (date.getMonth() + 1)).slice(-2)}-${(
    "00" + date.getDate()
  ).slice(-2)}`;
}

function App() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<timeData>({});
  useEffect(() => {
    setData({});
    fetch(`/${dateToString(date)}.json`).then((res) => {
      res.text().then((e) => {
        setData(JSON.parse(e));
      });
    });
  }, [date]);
  return (
    <div className="table">
      <input
        type="date"
        name=""
        value={dateToString(date)}
        id="timeSelector"
        onChange={(e) => {
          setDate(new Date(e.target.value));
        }}
      />
      {!Object.keys(data).length ? (
        <p>データがありません</p>
      ) : (
        <Table data={data} />
      )}
    </div>
  );
}

export default App;
