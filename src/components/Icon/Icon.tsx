import React from "react";
import iconSet from "./selection.json";
import IcomoonReact from "icomoon-react";

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
