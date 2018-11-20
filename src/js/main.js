// import objectFitImages from "object-fit-images";
// import $ from "jquery";
import Timeline from "./partials/Timeline";

const carsArray = [
  {
    id: "123123131",
    title: "Honda Civic",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-19T01:00:00", "2018-11-23T01:00:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-24T01:00:00", "2018-11-25T01:00:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T01:00:00", "2018-11-26T01:00:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T01:00:00", "2018-11-30T01:00:00"],
        cost: "500$"
      }
    ]
  }
];
$(document).ready(function() {
  "use strict";
  Timeline.init({
    source: carsArray,
    search: $("#search"),
    cellWidth: 100,
    render: {
      rowHead: {
        template: function(row) {
          return `${row.title}<br/>${row.id}`;
        }
      },
      rowAction: {
        //Attributes for timeline__action from type field
        attrsFromType: {
          1: { class: "success" },
          2: { class: "warning" }
        },
        template: function(action) {
          const { title, dates, cost } = action;
          const from = dates[0];
          const to = dates[1];
          return `<b>${title}</b><div>${from}<br> ${to}</div><br/>${cost}`;
        }
      }
    }
  });
});
