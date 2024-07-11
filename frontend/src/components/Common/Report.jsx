import { getReportFile } from "../../services/FileApi";
import { Button } from "../Form/Form";

function Report() {
  const handleBtnClick = () => {
    console.log("hi");
    getReportFile();
  };

  return (
    <div>
      <Button value={"사용자 목록 다운로드"} onClick={handleBtnClick}></Button>
    </div>
  );
}

export default Report;
