import React from "react";
import Forest from "./Forest";
import CarLane from "./CarLane";
import TruckLane from "./TruckLane";

const Row = ({ rowIndex, rowData }) => {
  switch (rowData.type) {
    case "forest": {
      return <Forest rowIndex={rowIndex} rowData={rowData} />;
    }
    case "car": {
      return <CarLane rowIndex={rowIndex} rowData={rowData} />;
    }
    case "truck": {
      return <TruckLane rowIndex={rowIndex} rowData={rowData} />;
    }
  }
};

export default Row;
