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
        dates: "10-12-2018 - 15-12-2018",
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: "17-12-2018 - 18-12-2018",
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
        dates: "10-12-2018 - 15-12-2018",
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: "17-12-2018 - 18-12-2018",
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
    render: {
      rowHead: {
        field: "id",
        template: function(row) {
          return `${row.title}<br/>${row.id}`;
        }
      },
      rowAction: {
        field: "actions",
        template: function(row) {
          return `${row.title}<br/>${row.id}`;
        }
      }
    }
  });
});
