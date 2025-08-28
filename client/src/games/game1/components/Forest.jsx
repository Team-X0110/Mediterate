import React from "react";
import Grass from "./Grass";
import Tree from "./Tree";

const Forest = ({ rowIndex, rowData }) => {
  return (
    <Grass rowIndex={rowIndex}>
      {rowData.trees.map((tree, index) => (
        <Tree key={index} tileIndex={tree.tileIndex} height={tree.height} />
      ))}
    </Grass>
  );
};

export default Forest;
