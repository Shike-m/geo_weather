import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipRaw from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const Chip = withStyles(cardStyles)(ChipRaw);

class Weather extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.dataFetching = setInterval(() => { this.props.onLoad(); }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.dataFetching);
  }

  drawLine = (data) => {

    if (data.consolidated_weather !== undefined) {
      return data.consolidated_weather;
      }  
  }
  render() {
    const {
      loading,
      name,
      weather_state_name,
      temperatureinFahrenheit,
      data
    } = this.props;
    if (loading) return <LinearProgress />;
    if (this.props.toolbar) {
      return (
        <Chip
          label={`Weather in ${name}: ${weather_state_name} and ${temperatureinFahrenheit}°`}
        />)
    } else {
      return (
        <div>
          <Chip style ={{margin:'30px'}}
            label={`Weather in ${name}: ${weather_state_name} and ${temperatureinFahrenheit}°`}
          />
          <LineChart width={800} height={400} data={this.drawLine(data)}>
            <Line type="monotone" dataKey="the_temp" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="applicable_date" />
            <YAxis />
          </LineChart>
        </div>
      );
    }

  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    data,
  } = state.weather;
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    data,
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_WEATHER,
      longitude: -95.3698,
      latitude: 29.7604
    })
});

export default connect(
  mapState,
  mapDispatch
)(Weather);
