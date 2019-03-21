import React, { Component } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';



class WeatherChart extends Component {
  
  //Use PureComponent and immutable also can be the good way.
  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.data!== nextProps.data) {
      return true;
    } else {
      return false;
      }
  }



  render() {
    const { data } = this.props;
      return (
        <div>
            <LineChart width={800} height={400} data={data}>
            <Line type="monotone" dataKey="the_temp" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="applicable_date" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
      );
    }

  }


export default WeatherChart;
