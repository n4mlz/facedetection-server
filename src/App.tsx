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
    <>
      {Object.keys(props.data).map((person) => (
        <>
          {props.data[person].map((e) => (
            <div style={{ top: `${(new Date(e)).getHours() * 60 + (new Date(e)).getMinutes()}px` }} >{(new Date(e)).toLocaleString() + e}</div>
            
          ))}
        </>
      ))}
      <table className="time">
        <tr className="tableHead">
          <th className="table"></th>
          {Object.keys(props.data).map((e) => (
            <th key={e}>{e}</th>
          ))}
        </tr>
        <tbody>{times}</tbody>
      </table>
    </>
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
