import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import CanvasJSReact from "../canvasjs.react";
import Axios from "axios";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Sales() {
  const [Electronics, setElectronics] = useState(0);
  const [Fashion, setFashion] = useState(0);
  const [Books, setBooks] = useState(0);
  const [Grocery, setGrocery] = useState(0);
  const [CategoryChart, setCategoryChart] = useState(true);
  const [DateChart, setDateChart] = useState(false);
  const [Data, setDate] = useState({
    Date1: "2020-03-13",
    Date2: "2020-04-14"
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/SalesByCategories").then(response => {
      console.log(response.data);
      setElectronics(response.data.Electronics);
      setFashion(response.data.Fashion);
      setBooks(response.data.Books);
      setGrocery(response.data.Grocery);
    });
  }, []);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Category Wise Sales"
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
          { x: 10, y: Electronics, indexLabel: "Electronics" },
          { x: 20, y: Fashion, indexLabel: "Fashion" },
          { x: 30, y: Books, indexLabel: "Books" },
          { x: 40, y: Grocery, indexLabel: "Grocery" }
        ]
      }
    ]
  };

  const changeHandler = async event => {
    console.log(event.target.name);
    switch (event.target.value) {
      case "CategoryWiseSales":
        setDateChart(false);
        setCategoryChart(true);
        return;
      case "DateWiseSales":
        setCategoryChart(false);
        setDateChart(true);
        return;
    }
  };

  const getSales = async () => {
    const response = await Axios.get("http://localhost:3001/sales/something", {
      a: "Fakhar"
    });
    console.log(response);
  };
  return (
    <SalesMainContainer>
      <Nav />
      <div className="sales-inner-container">
        <div className="charts-container">
          {CategoryChart ? (
            <CanvasJSChart
              options={options}
            /* onRef={ref => this.chart = ref} */
            />
          ) : null}
          {DateChart ? (
            <button onClick={getSales}>Get Monthly Sales</button>
          ) : null}
        </div>
      </div>
    </SalesMainContainer>
  );
}

export default Sales;

const SalesMainContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  .sales-inner-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .charts-container {
      width: 80%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      color: var(--theme);
      select {
        margin-bottom: 15px;
      }
    }
  }
`;
