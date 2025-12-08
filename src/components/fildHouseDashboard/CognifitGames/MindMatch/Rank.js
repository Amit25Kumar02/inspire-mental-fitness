import { useSelector } from "react-redux";

const Rank = ({setShowRank}) => {
  const { xpdata, leaderShipData } = useSelector((state) => state.games);
  //   console.log("rank is" , xpdata?.rank);
//   console.log("leadership score is ", leaderShipData);

  return (
    <div className="leadership-popup">
        <div className="d-flex justify-content-between align-items-center">
            <h3>Leadership Board</h3>
            <button onClick={()=>setShowRank(false)}>
                x
            </button>
        </div>
      <table>
        <tr>
          <th>
            <td>Email</td>
          </th>
          <th>Rank</th>
        </tr>

        {leaderShipData?.map((i, idx) =>
          idx < 10 ? (
            <tr>
              <td>{i.email}</td>
              <td>{i.rank}</td>
            </tr>
          ) : null
        )}
      </table>
    </div>
  );
};

export default Rank;
