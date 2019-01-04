import React from "react";
import One from "../icons/1.svg";
import Two from "../icons/2.svg";
import Three from "../icons/3.svg";
import Four from "../icons/4.svg";
import Five from "../icons/5.svg";
import Six from "../icons/6.svg";

const Dice = ({ value }) => {
  return (
    <React.Fragment>
      {value === 1 && <img src={One} alt="dice face" />}
      {value === 2 && <img src={Two} alt="dice face" />}
      {value === 3 && <img src={Three} alt="dice face" />}
      {value === 4 && <img src={Four} alt="dice face" />}
      {value === 5 && <img src={Five} alt="dice face" />}
      {value === 6 && <img src={Six} alt="dice face" />}
    </React.Fragment>
  );
};

export default Dice;
