import $ from "jquery";

const Timeline = (function() {
  "use strict";
  let setting = {
    source: "json",
    place: $("#timeline-wrap"),
    search: false,
    cellWidth: 50,
    rows: [],
    daysBefore: 20,
    viewDates: 22,
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
    /**
     * Add zeros before number
     * @param  {number} value for convert
     * @param  {number} digits out string length (default 2)
     * @return {string} numberStr
     */
    pad(value, digits = 2) {
      let numberStr = String(value);
      while (numberStr.length < digits) {
        numberStr = "0" + numberStr;
      }
      return numberStr;
    },
    div: function(val, by) {
      return (val - (val % by)) / by;
    },

    getRow: function(datesArray, actionsHTML) {
      // create table row
      let row = `<div class="timeline__row"><div class="timeline__cell-wrap">`;

      for (let i = 0; i < datesArray.length; i++) {
        const cellDay =
          '<div class="timeline__cell timeline__cell--half"></div><div class="timeline__cell"></div>';

        row += cellDay;
      }
      row += `</div>${actionsHTML}</div>`;

      return row;
    },
    getRowActions: function(row, rowId, actionsTemplate, actionsAttrs) {
      const actionsHTML = row.actions
        .map(action => {
          const from = moment(action.dates[0]);
          const to = moment(action.dates[1]);

          const duration = moment.duration(to.diff(from)).asHours();
          const actionStart = moment.duration(from.diff(setting.now)).asHours();

          const { type } = action;
          const left = Timeline.div(actionStart, 12) * setting.cellWidth;
          const maxWidth = Timeline.div(duration, 12) * setting.cellWidth - 2;

          let style = `style="left: ${left}px; max-width: ${maxWidth}px; min-width: ${maxWidth}px"`;

          let attrs = style;
          if (type) {
            const attrsObj = actionsAttrs[type];
            attrs +=
              " " +
              Object.keys(attrsObj)
                .map(attr => {
                  const attrVal = attrsObj[attr];
                  const attribute =
                    attr === "class"
                      ? `${attr}="timeline__action ${attrVal}"`
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
    renderTable: function(place, data, datesArray, rowHead, rowAction) {
      const titlesTemplate = rowHead.template;
      const actionsTemplate = rowAction.template;
      const actionsAttrs = rowAction.attrsForType;
      const rowWidth = datesArray.length * setting.cellWidth;
      let tableHeadHTML = "";
      let tableBodyHTML = "";
      let tableHTML = "";
      data.map((item, id) => {
        tableHeadHTML += `<div class="timeline__row">${titlesTemplate(
          item
        )}</div>`;

        const actionsHTML = Timeline.getRowActions(
          item,
          id,
          actionsTemplate,
          actionsAttrs
        );
        tableBodyHTML += Timeline.getRow(datesArray, actionsHTML);
      });

      tableHTML =
        `<div class="timeline__head">${tableHeadHTML}</div>` +
        `<div class="timeline__body"><div class="timeline__body-wrap" style="width:${rowWidth}px">${tableBodyHTML}</div></div>`;

      place.html(tableHTML);
    },
    init: function(props) {
      if (props) {
        setting = Timeline.extendObject(setting, props);
      }
      const dates = this.getDaysArray();

      const { source, render, place } = setting;

      const { rowHead, rowAction } = render;
      Timeline.renderTable(place, source, dates, rowHead, rowAction);
    }
  };
})();

export default Timeline;
