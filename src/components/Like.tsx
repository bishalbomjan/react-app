import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import React, { useState } from "react";
interface Props {
  onClick: () => void;
}
const Like = ({ onClick }: Props) => {
  const [likeState, setLikeState] = useState(false);
  const toggle = () => {
    setLikeState(!likeState);
    onClick();
  };
  if (likeState) return <FaHeart size={50} color="#ff6b81" onClick={toggle} />;
  return <CiHeart size={50} onClick={toggle} />;
};

export default Like;
