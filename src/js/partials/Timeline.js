import $ from "jquery";
const Timeline = (function() {
  "use strict";
  let setting = {
    source: "json",
    place: $("#timeline-wrap"),
    cellWidth: 100,
    rows: [],
    daysBefore: 5,
    viewDates: 15,
    now: new Date()
  };
  return {
    extendObject: function(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          obj[key] = src[key];
        }
      }
      return obj;
    },
    getDay: function(startDate, days) {
      var returnDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + days,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds(),
        startDate.getMilliseconds()
      );
      return returnDate;
    },
    getDaysArray: function() {
      let datesArray = [];
      for (
        let i = -setting.daysBefore;
        i < setting.viewDates - setting.daysBefore;
        i++
      ) {
        datesArray.push(Timeline.getDay(setting.now, i));
      }

      return datesArray;
    },

    getDatesRow: function(datesArray) {
      // create table row head
      let rowHead = '<div class="timeline__row-head">';
      const cellWidth = setting.cellWidth - 2;
      for (let i = 0; i < datesArray.length; i++) {
        const cellDay = `<div class="timeline__cell" style="width:${cellWidth}px"><div class="timeline__cell-inner"><b>${moment(
          datesArray[i]
        ).format("DD.MM")}</b><br>${moment(datesArray[i]).format(
          "ddd"
        )}</div></div>`;

        rowHead += cellDay;
      }
      rowHead += "</div>";
      return rowHead;
    },
    getRow: function(datesArray, actionsHTML) {
      // create table row
      let row = `<div class="timeline__row">`;
      const width = setting.cellWidth;
      for (let i = 0; i < datesArray.length; i++) {
        const cellDay = `<div class="timeline__cell" style="width: ${width}px"></div>`;

        row += cellDay;
      }
      row += `${actionsHTML}</div>`;

      return row;
    },
    formatTime: function(time) {
      const part = time % 1;
      const intPart = time - part;
      if (time < 0) {
        const format = intPart - (Math.abs(part) < 0.5 ? 0.5 : 1);
        return format;
      } else {
        const format = intPart + (part < 0.5 ? 0.5 : 1);
        return format;
      }
    },

    offsetToDate: function(offset) {
      const actionStart = moment.duration(from.diff(setting.now)).asDays();
    },
    getRowActions: function(row, rowId, actionsTemplate, actionsAttrs) {
      const actionsHTML = row.actions
        .map(action => {
          const from = moment(action.dates[0]);
          const to = moment(action.dates[1]);

          const { type } = action;

          const actionStart = Timeline.formatTime(
            moment
              .duration(from.diff(setting.now))
              .asDays()
              .toFixed(2)
          );

          const duration = Timeline.formatTime(
            moment
              .duration(to.diff(from))
              .asDays()
              .toFixed(2)
          );
          console.log(duration);

          const left =
            actionStart * setting.cellWidth +
            setting.daysBefore * setting.cellWidth +
            0.5 * setting.cellWidth;

          const maxWidth = duration * setting.cellWidth;

          let style = `style="left: ${left}px; max-width: ${maxWidth}px; min-width: ${maxWidth}px"`;
          let data = `data-duration="${duration}"`;

          let attrs = style + " " + data;
          if (type) {
            const attrsObj = actionsAttrs[type];
            attrs +=
              " " +
              Object.keys(attrsObj)
                .map(attr => {
                  const attrVal = attrsObj[attr];
                  const attribute =
                    attr === "class"
                      ? `${attr}="timeline__action ${attrVal} js_timeline-action"`
                      : `${attr}="${attrVal.replace("$", rowId)}"`;
                  return attribute;
                })
                .join(" ");
          }

          return `<div ${attrs}>
        <div class="timeline__action-content">
          ${actionsTemplate(action)}
        </div>
        </div>`;
        })
        .join("");
      return actionsHTML;
    },
    renderTable: function(
      place,
      data,
      datesArray,
      rowHead,
      rowAction,
      actionTemplate
    ) {
      const titlesTemplate = rowHead.template;
      const actionsTemplate = rowAction.template;
      const actionsAttrs = rowAction.attrsForType;
      const rowWidth = datesArray.length * setting.cellWidth;
      let tableLeftHTML = "";
      let tableBodyHTML = "";
      let tableHTML = "";
      let itemNewActions = "";

      const datesRow = Timeline.getDatesRow(datesArray);
      tableBodyHTML += datesRow;

      data.map((item, id) => {
        tableLeftHTML += `<div class="timeline__row">${titlesTemplate(
          item
        )}</div>`;

        const actionsHTML = Timeline.getRowActions(
          item,
          id,
          actionsTemplate,
          actionsAttrs
        );
        tableBodyHTML += Timeline.getRow(datesArray, actionsHTML);
        itemNewActions += `<div class="timeline__row"><div class="timeline__new-action"  data-id="${
          item.id
        }">${actionTemplate()}</div></div>`;
      });

      tableBodyHTML += datesRow;

      tableHTML =
        `<div class="timeline__left">${tableLeftHTML}</div>` +
        `<div class="timeline__body"><div class="timeline__body-wrap" style="width:${rowWidth}px">${tableBodyHTML}</div></div><div class="timeline__right">${itemNewActions}</div>`;

      place.html(tableHTML);
    },

    events: function() {
      $(document).on("mousedown", ".js_timeline-action", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const _this = $(this);

        const actions = $(".js_timeline-action");
        actions.removeClass("is-open");
        // actions.removeClass("left-vis");
        _this.addClass("is-open");

        // const left = _this.css("left");
        // const leftVal = parseInt(left);
        // if (leftVal < 0) {
        //   _this.addClass("left-vis");
        // }
      });
      $(document).on("mouseup", ".js_timeline-action", function(e) {
        const _this = $(this);
        _this.removeClass("is-open");
      });
      $(".js_add-prev-day").click(function() {
        setting.daysBefore += 1;
        Timeline.reinit();
      });
      $(".js_remove-prev-day").click(function() {
        setting.daysBefore -= 1;
        Timeline.reinit();
      });
      $(".js_week1").click(function() {
        setting.viewDates = 7;
        Timeline.reinit();
      });
      $(".js_week2").click(function() {
        setting.viewDates = 14;
        Timeline.reinit();
      });
      $(".js_month").click(function() {
        setting.viewDates = 30;
        Timeline.reinit();
      });
      // Hide open action
      $(document).on("click", function(e) {
        const target = $(e.target);
        if (!target.hasClass("js_timeline-action")) {
          const actions = $(".js_timeline-action");
          actions.removeClass("is-open");
          actions.removeClass("left-vis");
        }
      });
    },
    dragEvents: function(selector) {
      let startLeft = 0;
      let fromDateNode, toDateNode;
      $(selector).draggable({
        axis: "x",
        grid: [setting.cellWidth / 2, 0],
        start: function(event, ui) {
          startLeft = ui.position.left;
          fromDateNode = $(event.target).find(".js_from-date");
          toDateNode = $(event.target).find(".js_to-date");
        },
        drag: function(event, ui) {
          fromDateNode.html(ui.position.left);
          const left = ui.position.left;
        },
        stop: function(event, ui) {
          console.log(ui.position.left);
        }
      });
    },

    reinit: function() {
      const dates = this.getDaysArray();

      const { source, render, place } = setting;

      const { rowHead, rowAction, actionTemplate } = render;

      Timeline.renderTable(
        place,
        source,
        dates,
        rowHead,
        rowAction,
        actionTemplate
      );
      Timeline.dragEvents(".js_timeline-action");
    },
    init: function(props) {
      if (props) {
        setting = Timeline.extendObject(setting, props);
      }
      const dates = this.getDaysArray();

      const { source, render, place } = setting;

      const { rowHead, rowAction, actionTemplate } = render;

      Timeline.renderTable(
        place,
        source,
        dates,
        rowHead,
        rowAction,
        actionTemplate
      );

      Timeline.events();

      Timeline.dragEvents(".js_timeline-action");

      return this;
    }
  };
})();

export default Timeline;
