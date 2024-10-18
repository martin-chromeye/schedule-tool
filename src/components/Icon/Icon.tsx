import React from "react";
import IcomoonReact from "icomoon-react";
import iconSet from "./selection.json";

type Props = {
  name: string;
  className?: string;
  onClick?: () => void;
};

const Icon = ({ name, className = "", onClick }: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <IcomoonReact iconSet={iconSet} icon={name} />
    </div>
  );
};

export default Icon;
