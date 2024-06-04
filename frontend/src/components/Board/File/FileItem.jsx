import { processFileName } from "../../../utils/fileHandler";

function FileItem({ fname, fId, type, onClick }) {
  return (
    <li className="mr-4 position-relative">
      {processFileName(fname)}
      <span
        className="position-absolute text-bold text-dark"
        style={{ bottom: 5, cursor: "pointer" }}
        data-type={type}
        data-fname={fname}
        data-id={fId}
        onClick={onClick}
      >
        x
      </span>
    </li>
  );
}

export default FileItem;
