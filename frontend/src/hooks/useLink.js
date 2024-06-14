import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useLink = () => {
  const navigate = useNavigate();

  const moveToLink = useCallback(
    (link, e) => {
      if (e) {
        e.preventDefault();
      }
      navigate(link);
    },
    [navigate]
  );
  return moveToLink;
};

export default useLink;
