import React, { Component } from 'react'
import { get_weather_data, get_elevation_data } from '../Functions/Functions'
import Highcharts from 'highcharts';
import $ from 'jquery';
import * as L from 'leaflet';

class Weather extends Component {
  constructor() {
    super()
    this.state = {
      apidata: {},
      timezon: '',
      daily_temps: [],
      daily_times: [],
      hourly_temps: [],
      hourly_times: [],
      meet: Float32Array,
      feet: Float32Array,
      lat: Float32Array,
      lon: Float32Array,
      isLoaded: false,
      error: null
    }
  }
  country = ''
  // For highcharts
  daily_highchart_options = {
    chart: {
      type: 'area',
      backgroundColor: 'none',
      height: 250,
      color: 'white'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    plotOptions: {
      area: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    tooltip: {
      valueSuffix: " °C"
    },
    series: [
      {
        name: '',
        data: []
      }
    ]
  };
  hourly_highchart_options = {
    chart: {
      type: 'area',
      backgroundColor: 'none',
      height: 250,
      color: 'white'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    plotOptions: {
      area: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    tooltip: {
      valueSuffix: " °C"
    },
    series: [
      {
        name: '',
        data: []
      }
    ]
  };

  componentDidMount() {
    this.state.lat = this.props.match.params.lat;
    this.state.lon = this.props.match.params.lon;
    get_weather_data(this.state.lat, this.state.lon)
      .then(
        (result) => {
          this.setState({
            apidata: result,
            isLoaded: true,
          });

          // For hourly and daily highcahrts
          for (var i = 0; i <= 23; i = i + 3) {
            this.state.daily_temps.push(Math.round((result.hourly.data[i].temperature - 32) * (5 / 9)));
            this.state.daily_times.push(new Date(result.hourly.data[i].time * 1000).toTimeString().slice(0, 2));
          }
          for (i = 0; i <= 23; i++) {
            this.state.hourly_temps.push(Math.round((result.hourly.data[i].temperature - 32) * (5 / 9)));
            this.state.hourly_times.push(new Date(result.hourly.data[i].time * 1000).toTimeString().slice(0, 2));
          }
          this.daily_highchart_options.xAxis['categories'] = this.state.daily_times;
          this.daily_highchart_options.series[0]['data'] = this.state.daily_temps;
          this.hourly_highchart_options.xAxis['categories'] = this.state.hourly_times;
          this.hourly_highchart_options.series[0]['data'] = this.state.hourly_temps;

          // For highcharts
          Highcharts.chart('daily-container', this.daily_highchart_options);
          Highcharts.chart('hourly-container', this.hourly_highchart_options);
          $(".highcharts-yaxis-grid,.highcharts-yaxis-labels,.highcharts-legend-item,.highcharts-credits,.highcharts-axis-line").css("display", "none")
          $(".highcharts-text-outline,.highcharts-graph").css("stroke", "none")
          $(".highcharts-area").css("fill", "#c0c0c087")
          $(".highcharts-point").css("fill", "#e2dfdf")
          $("text").css("fill", "white")

          // Name of country
          if (this.props.match.params.lat == 31.963158 || this.props.match.params.lat === undefined) {
            this.country = 'Amman';
          } else if (this.props.match.params.lat == 29.531919) {
            this.country = 'Aqaba';
          } else if (this.props.match.params.lat == 32.551445) {
            this.country = 'Irbid';
          } else if (this.props.match.params.lat == 32.332687) {
            this.country = 'Ajloun';
          } else if (this.props.match.params.lat == 32.280818) {
            this.country = 'Jerash';
          } else if (this.props.match.params.lat == 32.342891) {
            this.country = 'Al Mafraq';
          } else {
            this.country = "" + result.timezone + "";
          }
          $('.name-of-country').html("" + this.country + "");
          $('title').html("Weather App | " + this.country + "");

        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )

  }

  // daily and hourly 
  show_daily() {
    $("#daily-container").css("display", "block")
    $("#hourly-container").css("display", "none")
    $(".hourly-btn").removeClass(" active-summary");
    $(".daily-btn").addClass(" active-summary");
  }

  show_hourly() {
    $("#daily-container").css("display", "none")
    $("#hourly-container").css("display", "block")
    $(".hourly-btn").addClass(" active-summary")
    $(".daily-btn").removeClass(" active-summary")
  }

  // For elevation data
  get_elevation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.state.lat = position.coords.latitude;
      this.state.lon = position.coords.longitude;
      this.elevation_data(this.state.lat, this.state.lon);
    }
    );
  }
  elevation_data(latit, longit) {
    $('.get-elevation-btn').attr({ 'disabled': 'disabled', 'title': 'reload page' });
    $('.get-elevation-btn').css({ 'cursor': 'not-allowed', 'opacity': '0.5' });
    $('.load-circle,.loading-data').css('display', 'block');
    document.body.scrollTop = 1200;
    document.documentElement.scrollTop = 1200;
    get_elevation_data(latit, longit)
      .then(
        (result) => {
          setTimeout(() => {
            $('.load-circle,.loading-data').css('display', 'none');
            $('.elev-data').css('display', 'block');
            this.apidata = result;
            this.state.meet = Math.round(this.apidata.elevations[0].elevation);
            this.state.feet = ((this.apidata.elevations[0].elevation) * 3.28);
            $('.altitude-value').html("" + Math.round(this.apidata.elevations[0].elevation) + " Meter");
          }, 2000);
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
  }

  feet_to_meter() {
    var meters = this.state.meet;
    $('.altitude-value').hide();
    $('.meter-value').removeAttr("title");
    $('.feet-value').attr("title", "Click here to feet value.")
    $('.feet-or-meter-value').html("" + meters + " Meter");
    $('.meter-value').css('color', 'silver');
    $('.feet-value').css('color', '#c0c0c087');
  }
  meter_to_feet() {
    var feets = Math.round(this.state.feet);
    $('.altitude-value').hide();
    $('.feet-value').removeAttr("title");
    $('.meter-value').attr("title", "Click here to meter value.")
    $('.feet-or-meter-value').html("" + feets + " Feet");
    $('.feet-value').css('color', 'silver');
    $('.meter-value').css('color', '#c0c0c087');
  }

  // For temperature data at user's loaction
  get_current_position() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      window.location.replace("/" + this.lat + "/" + this.lon + "")
    }
    );
  }

  // For user's location at the map
  get_map_location() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      $('.get-map-btn').attr({ 'disabled': 'disabled', 'title': 'reload page' });
      $('.get-map-btn').css({ 'cursor': 'not-allowed', 'opacity': '0.5' });
      $('.map-load-circle,.map-loading-data').css('display', 'block');
      document.body.scrollTop = 2200;
      document.documentElement.scrollTop = 2200;
      setTimeout(() => {
        $('.map-load-circle,.map-loading-data').css('display', 'none');
        $('#map').css('display', 'block');
        document.body.scrollTop = 2200;
        document.documentElement.scrollTop = 2200;
        var map = L.map('map', { drawControl: true }).setView([this.lat, this.lon], 13);
        L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map)
        L.marker([this.lat, this.lon]).bindPopup("<b>You are here.").addTo(map).openPopup();
      }, 2000);
    }
    );
  }

  render() {
    const { apidata, error, isLoaded } = this.state;
    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>)
    } else if (!isLoaded) {
      return (
        <div className="loading-page" >
          <h2>Loading...</h2>
        </div>
      )
    } else {
      return (
        <div className="weather-app-contents">
          <br />

          <div className="dropdown">
            <button className="dropdown-toggle" data-toggle="dropdown">
              <span style={{ marginLeft: '18px' }} className="name-of-country"></span>
            </button>
            <i className="fa fa-map-marker" aria-hidden="true" onClick={() => this.get_current_position()}
              title="Get the temperature at your specific location"></i>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/31.963158/35.930359">Amman</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/29.531919/35.006084">Aqaba</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/32.551445/35.851479">Irbid</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/32.332687/35.751785">Ajloun</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/32.280818/35.899288">Jerash</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/32.342891/36.208038">Al Mafraq</a>
            </div>
          </div > <br />

          <div className="elevation-and-map">
            <div>
              <button type="button" onClick={() => this.get_elevation()} className="get-elevation-btn">Get your location's
              elevation
              </button>
              <p className="load-circle"></p>
              <p className="loading-data">Loading...</p>
              <div className="elev-data" style={{ display: 'none' }}>
                <div className="altitude" >
                  <span className="your-altitude">Your location's altitude:</span>
                  <br /><span className="altitude-value"></span>
                  <span className="feet-or-meter-value"></span>
                </div>
                <div className="meter-feet-btns" >
                  <span className="meter-value" onClick={() => this.feet_to_meter()}>m</span>
                  <span title="Click here to feet value." onClick={() => this.meter_to_feet()} className="feet-value">ft</span>
                </div >
              </div>
            </div >
            <div>
              <button type="button" onClick={() => this.get_map_location()} className="get-map-btn">Get your location's at
                    map</button>
              <p className="map-load-circle"></p>
              <p className="map-loading-data">Loading...</p>
              <div id="map"></div >
            </div >
          </div>

          <div className="currently-temp">
            <div>
              <span className="temp">{Math.round((apidata.currently.temperature - 32) * (5 / 9))}</span>
              <span className="temp-unit">&deg;C</span>
            </div>
            <div className="feels-visibilty">
              <span>{apidata.currently.summary}</span><br />
              <span>Feels Like {Math.round((apidata.currently.apparentTemperature - 32) * (5 / 9))}&deg;</span><br />
              <span>Visibility {Math.round(apidata.currently.visibility)} mi</span>
            </div>
            <div className="wind-humidity">
              <span>Wind {Math.round(apidata.currently.windSpeed)} mph</span><br />
              <span>Humidity {apidata.currently.humidity}</span>
            </div>
            <div className="barometer-dewpoint">
              <span>Barometer {Math.round(apidata.currently.pressure)}</span><br />
              <span>Dew Point {Math.round(apidata.currently.dewPoint)}°</span>
            </div>
            <div className="weather-summary" style={{ display: 'none' }}>
              <span style={{ fontSize: '25px' }}>{apidata.currently.summary}</span><br />
              <span>{Math.round(apidata.currently.windSpeed)} mph</span><br />
            </div>
          </div>

          <div className="six-days-temp" >
            {(apidata.daily.data).map(day =>
              <div className="day" key={(apidata.daily.data).indexOf(day)} >
                {(apidata.daily.data).indexOf(day) <= 5 &&
                  <div className="day-contents" >
                    <span className="day-name">{ new Date(day.time * 1000).toDateString().slice(0, 10) }</span><br />
                    <span>Hum: {day.humidity}</span><br />
                    <span className="day-temp">{Math.round((day.temperatureHigh - 32) * (5 / 9))}&deg;</span><br />
                    <span className="night-temp">{Math.round((day.temperatureLow - 32) * (5 / 9))}&deg;</span>
                  </div>
                }
              </div>)}
          </div>

          <div className="daily-hourly-temp">
            <div className="change-summary">
              <button className="daily-btn active-summary" onClick={() => this.show_daily()}>
                DAILY SUMMARY
                </button>
              <button className="hourly-btn" onClick={() => this.show_hourly()}>
                HOURLY
                </button>
            </div>
            <div className="daily-summary">
              <div id="daily-container"></div>
            </div>
            <div className="hourly-summary">
              <div id="hourly-container" style={{ display: 'none' }}></div>
            </div>
            <div className="data-source">
              <span>Data from Dark Sky API</span>
            </div >
            <br /><br />
          </div>
        </div >
      );
    }
  }
}

export default Weather;