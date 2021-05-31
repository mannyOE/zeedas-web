import React, { Component, PureComponent } from 'react';
import {
  Pie,
} from 'react-chartjs-2';

class Legend extends PureComponent {
  render() {
    if (this.props.legend) {
      const legend = this.props.legend.filter((item) =>
        item.props.dataquantity >= 0).sort((a, b) => b.props.dataquantity - a.props.dataquantity);
      return (
        <>
          <ul className="legend-group list-group">
            {legend}
          </ul>
        </>
      );
    }
  }
}

class PieChartCustomLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: [],
    };
  }

  componentDidMount() {
    const legend = this.chart && this.chart.chartInstance.generateLegend();
    this.setState({ legend });
  }

  legendMarkup = (chart) => {
    const legendSet = chart.data.datasets[0];
    const legend = legendSet.data.map((set, i) => {
      const dataPoint = chart.data.labels[i];
      if (dataPoint) {
        return (
          <li
            id={`${dataPoint.replace(/\s/g, "")}`}
            key={dataPoint}
            onClick={(e) => this.handleLegendOnClick(e)}
            className="legend-group--item"
            dataIdx={i}
            dataquantity={legendSet.data[i]}
            style={{ borderColor: legendSet.backgroundColor[i] }}
          >
            <span style={{ backgroundColor: legendSet.backgroundColor[i] }} />
            <mark className={"plot-name"}>{`${dataPoint}`}</mark>
            <mark
              className={"plot-value"}
            >
              {legendSet.data[i]}
              {/* {` ${dataPoint.replace(/\(\d{1, 6}\)$/g, "")}`} */}
            </mark>
          </li>
        );
      }
      return "";
    });
    return legend;
  }

  handleLegendOnClick = (e) => {
    const inst = this.chart.chartInstance;
    const el = document.getElementById(e.currentTarget.id);

    if (el.classList.contains("btn-disabled")) {
      el.classList.remove("btn-disabled");
    } else {
      el.classList.add("btn-disabled");
    }

    const t = el.getAttribute("dataIdx");
    const meta = inst.config.data.datasets[0]._meta;
    const first = Object.keys(meta)[0];
    meta[first].data[t].hidden = !meta[first].data[t].hidden;
    inst.update();
  }

  render() {
    const { legend } = this.state;
    return (
      <div style={{
        position: "relative",
        right: "50px",
      }}
      >
        <Pie
          height={131}
          width={250}
          ref={(el) => (this.chart = el)}
          data={this.props.data}
          options={{
            maintainAspectRatio: false,
            responsive: false,
            layout: {
              padding: {
                // left: 50,
                right: 0,
                top: 10,
                bottom: 10,
              },
            },
            legend: {
              display: false,
              position: 'right',
              align: 'start',
              labels: {
                boxWidth: 5,
                padding: 27,
                usePointStyle: true,
              },
            },
            legendCallback: this.legendMarkup,
          }}
        />
        <Legend
          ref={(el) => (this.legend = el)}
          legend={legend}
          handleLegendOnClick={(e) => this.handleLegendOnClick(e)}
        />
      </div>
    );
  }
}

export default PieChartCustomLegend;

// var oilData = {
//   labels: [
//     "Saudi Arabia",
//     "Russia",
//     "Iraq",
//     "United Arab Emirates",
//     "Canada"
//   ],
//   datasets: [
//     {
//       data: [133.3, 86.2, 52.2, 51.2, 50.2],
//       backgroundColor: [
//         "#FF6384",
//         "#63FF84",
//         "#84FF63",
//         "#8463FF",
//         "#6384FF"
//       ]
//     }]
// };
