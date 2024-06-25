import { CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFile } from "../../../services/FileApi";
import { processFileName } from "../../../utils/fileHandler";

function File({ fileList }) {
  const handleFileClick = (e, file) => {
    e.preventDefault();
    getFile(file.originalName, file.uploadedName);
  };

  return (
    <CardBody className="flex">
      <label className="mr-3">파일</label>
      <div>
        {fileList &&
          fileList.map((file, idx) => (
            <Link
              key={`file-${idx}`}
              className="mr-3 small"
              onClick={(e) => {
                handleFileClick(e, file);
              }}
            >
              {processFileName(file.originalName)}
            </Link>
          ))}
      </div>
    </CardBody>
  );
}

export default File;
