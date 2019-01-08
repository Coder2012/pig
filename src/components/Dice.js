import React from "react";
import { ReactComponent as One} from "../icons/1.svg";
import { ReactComponent as Two} from "../icons/2.svg";
import { ReactComponent as Three} from "../icons/3.svg";
import { ReactComponent as Four} from "../icons/4.svg";
import { ReactComponent as Five} from "../icons/5.svg";
import { ReactComponent as Six} from "../icons/6.svg";

const Dice = ({ value }) => {
  return (
    <React.Fragment>
      {value === 1 && <One />}
      {value === 2 && <Two />}
      {value === 3 && <Three />}
      {value === 4 && <Four />}
      {value === 5 && <Five />}
      {value === 6 && <Six />}
    </React.Fragment>
  );
};

export default Dice;
