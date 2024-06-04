import { useEffect, useState } from "react";
import { FormLabel } from "react-bootstrap";
import { addFile } from "../../../utils/fileHandler";
import { thrownHandler } from "../../../utils/ValidatorAlert";
import * as Form from "../../Form/Form";
import FileItem from "./FileItem";

function FileWrite({ originFiles = [], fileRef }) {
  const [newFiles, setNewFiles] = useState([]);
  const [originIdList, setOriginIdList] = useState([]);
  const totalFCount =
    newFiles.length + originFiles.length - originIdList.length;

  useEffect(() => {
    fileRef.current.newFiles = newFiles;
  }, [newFiles]);

  useEffect(() => {
    fileRef.current.originIdList = originIdList;
  }, [originIdList]);

  const handleFileInputchange = (e) => {
    e.preventDefault();
    try {
      addFile(e.target, setNewFiles, totalFCount);
    } catch (thrown) {
      thrownHandler(thrown);
    }
  };

  const handleRemoveBtnClick = (e) => {
    if (!confirm("등록한 파일을 삭제하시겠습니까?")) {
      return;
    }

    const dataset = e.target.dataset;
    const type = dataset.type;

    if (type === "new") {
      const fileName = dataset.fname;
      setNewFiles((prev) => prev.filter((el) => el.name !== fileName));
    } else if (type === "origin") {
      const fileId = dataset.id;
      setOriginIdList((prev) => [...prev, Number.parseInt(fileId)]);
    }
  };

  return (
    <>
      <Form.Input
        id="boardFiles"
        type={"file"}
        multiple="multiple"
        className="hidden"
        onChange={handleFileInputchange}
      />
      <FormLabel className="btn btn-sm btn-primary" htmlFor="boardFiles">
        파일 업로드
      </FormLabel>
      <span className="ml-2 small">파일 {totalFCount}개</span>
      <ul className="ml-1 small row">
        {originFiles &&
          originFiles
            .filter((f) => !originIdList.includes(f.id))
            .map((file, idx) => (
              <FileItem
                key={`originFile-${idx}`}
                fname={file.originalName}
                fId={file.id}
                type="origin"
                onClick={handleRemoveBtnClick}
              />
            ))}
        {newFiles &&
          newFiles.map((file, idx) => (
            <FileItem
              key={`newFile-${idx}`}
              fname={file.name}
              type="new"
              onClick={handleRemoveBtnClick}
            />
          ))}
      </ul>
    </>
  );
}

export default FileWrite;
