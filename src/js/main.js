// import objectFitImages from "object-fit-images";
// import $ from "jquery";
import Timeline from "./partials/Timeline";

const carsArray = [
  {
    id: "123123131",
    title: "Honda Civic",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-18T15:40:00", "2018-11-24T00:00:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-24T15:40:00", "2018-11-25T15:40:00"],
        cost: "500$"
      },
      {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-29T15:40:00", "2018-12-04T15:40:00"],
        cost: "500$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-12-05T15:40:00", "2018-12-08T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "55123",
    title: "Toyota Camry",
    group: "sedan",
    actions: [
      {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-20T15:40:00", "2018-11-22T15:40:00"],
        cost: "124$"
      },
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-23T15:40:00", "2018-11-25T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "44125",
    title: "Bugatti Veyron",
    group: "SportCar",
    actions: [
      {
        type: 2,
        title: "Car rent",
        dates: ["2018-11-23T15:40:00", "2018-11-28T15:40:00"],
        cost: "124$"
      },
      {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-28T15:40:00", "2018-11-29T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  },
  {
    id: "3124",
    title: "BMW M6",
    group: "sedan",
    actions: [
      {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    ]
  }
];
$(document).ready(function() {
  "use strict";

  Timeline.init({
    source: carsArray,
    place: $("#timeline-wrap"),
    cellWidth: 50,
    render: {
      rowHead: {
        template: function(row) {
          return `<div><b class="bold mb-5">${row.title}</b><br/>ID - ${
            row.id
          }</div>`;
        }
      },
      rowAction: {
        //Attributes for timeline__action from type field
        // $ - replace to row index
        attrsForType: {
          1: { class: "success" },
          3: { class: "warning", id: "asd-$" },
          2: { class: "brand" }
        },
        template: function(action) {
          const { title, dates, cost } = action;
          const from = moment(dates[0]).format("DD.MM (HH:mm)");
          const to = moment(dates[1]).format("DD.MM (HH:mm)");
          const priceHTML = cost
            ? `<span class="price"><b class="bold">Total price</b> - ${cost}</span>`
            : "";
          return `<b class="bold">${title}</b><div class="dates">From: ${from}<br/>To: ${to}</div>${priceHTML}`;
        }
      },
      actionTemplate: function() {
        return `<button class="add-action js_add-action"><span>+</span></button>`;
      }
    }
  });
});
