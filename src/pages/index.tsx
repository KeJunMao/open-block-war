import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  const nav = useNavigate();
  useEffect(() => {
    nav("/1439885");
  }, []);
  return <></>;
}
