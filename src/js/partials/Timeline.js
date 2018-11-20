import $ from "jquery";

const Timeline = (function() {
  "use strict";
  let setting = {
    source: "json",
    place: $("#timeline-wrap"),
    search: false,
    cellWidth: 100,
    rows: [],
    daysBefore: 3,
    viewDates: 7,
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

    renderRow: function(place, datesArray, headHTML, actionsHTML) {
      // create table row
      const row = $('<div class="timeline__row">');
      place.append(row);

      // create head cell
      const headCell = $('<div class="timeline__cell timeline__cell--head">');
      row.append(headCell);

      // create cells wrapper
      const cellsWrap = $('<div class="timeline__cells-wrap">');
      row.append(cellsWrap);

      headCell.html(headHTML);
      cellsWrap.html(actionsHTML);
    },
    getRowActions: function(row, actionsTemplate, actionsAttrs) {
      const actionsHTML = row.actions.map(action => {
        const from = moment(action.dates[0])._d.getDate();
        const to = moment(action.dates[1])._d.getDate();

        const nowDate = setting.now.getDate();
        const { type } = action;
        const left = (from - nowDate) * setting.cellWidth;
        const maxWidth = (to - from) * setting.cellWidth;

        let style = `style="left: ${left}px; max-width: ${maxWidth}px; width: ${maxWidth}px"`;

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
                    : `${attr}="${attrVal}"`;
                return attribute;
              })
              .join(" ");
        }

        return `<div ${attrs}>
        <div class="timeline__action-content">
          ${actionsTemplate(action)}
        </div>
        </div>`;
      });
      return actionsHTML;
    },
    renderTable: function(place, data, datesArray, rowHead, rowAction) {
      const headTemplate = rowHead.template;
      const actionsTemplate = rowAction.template;
      const actionsAttrs = rowAction.attrsFromType;
      data.map(item => {
        const headHTML = headTemplate(item);

        const actionsHTML = Timeline.getRowActions(
          item,
          actionsTemplate,
          actionsAttrs
        );

        Timeline.renderRow(place, datesArray, headHTML, actionsHTML);
      });
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
