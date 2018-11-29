// import objectFitImages from "object-fit-images";
// import $ from "jquery";
import Timeline from "./partials/Timeline";

const carsArray = {
  "123123131": {
    title: "Honda Civic",

    actions: {
      "123": {
        type: 2,
        title: "Car repair Violet",
        dates: ["2018-11-28T11:59:59", "2018-11-28T12:00:00"],
        cost: "500$"
      },
      "124": {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-30T15:40:00", "2018-12-04T11:40:00"],
        cost: "500$"
      },
      "125": {
        type: 2,
        title: "Car repair",
        dates: ["2018-12-05T15:40:00", "2018-12-08T15:40:00"],
        cost: "500$"
      }
    }
  },
  "55123": {
    title: "Toyota Camry",

    actions: {
      "126": {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-20T15:40:00", "2018-11-22T15:40:00"],
        cost: "124$"
      },
      "127": {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-23T09:40:00", "2018-11-25T15:40:00"],
        cost: "500$"
      }
    }
  },
  "44125": {
    title: "Bugatti Veyron",

    actions: {
      "128": {
        type: 2,
        title: "Car rent",
        dates: ["2018-11-23T15:40:00", "2018-11-28T15:40:00"],
        cost: "124$"
      },
      "129": {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-29T09:40:00", "2018-11-29T15:40:00"],
        cost: "500$"
      }
    }
  },
  "3124": {
    title: "BMW M6",

    actions: {
      "130": {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      "131": {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      "132": {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    }
  },
  "44129": {
    title: "Bugatti Veyron",

    actions: {
      "128": {
        type: 2,
        title: "Car rent",
        dates: ["2018-11-23T15:40:00", "2018-11-28T15:40:00"],
        cost: "124$"
      },
      "129": {
        type: 3,
        title: "Car repair",
        dates: ["2018-11-29T09:40:00", "2018-11-29T15:40:00"],
        cost: "500$"
      }
    }
  },
  "3123": {
    title: "BMW M6",

    actions: {
      "130": {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      "131": {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      "132": {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    }
  },
  "31212341": {
    title: "BMW M6",

    actions: {
      "130": {
        type: 1,
        title: "Car rent",
        dates: ["2018-11-22T15:40:00", "2018-11-25T15:40:00"],
        cost: "124$"
      },
      "131": {
        type: 2,
        title: "Car repair",
        dates: ["2018-11-26T15:40:00", "2018-11-30T15:40:00"],
        cost: ""
      },
      "132": {
        type: 3,
        title: "Car check",
        dates: ["2018-12-01T15:40:00", "2018-12-02T15:40:00"],
        cost: "500$"
      }
    }
  }
};
$(document).ready(function() {
  "use strict";

  Timeline.init({
    source: carsArray,
    place: $("#timelines"),
    cellWidth: 100,
    showItems: 3,
    render: {
      rowHead: {
        template: function(row, id) {
          return `<div><b class="bold mb-5">${
            row.title
          }</b><br/>ID - ${id}</div>`;
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
          const from = moment(dates[0]).format("DD.MM (A)");
          const to = moment(dates[1]).format("DD.MM (A)");
          const priceHTML = cost
            ? `<span class="price"><b class="bold">Total price</b> - ${cost}</span>`
            : "";
          return `<b class="bold">${title}</b><div class="dates">From: <span class="js_from-date">${from}</span><br/>To: <span class="js_to-date">${to}</span></div>${priceHTML}`;
        }
      },
      addActionTemplate: function(row) {
        const title = row.title;
        const id = row.id;
        return `<button class="add-action js_add-action" title="${title} - ${id}"></button>`;
      }
    }
  });
});
