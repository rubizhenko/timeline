import $ from "jquery";

const Timeline = (function() {
  "use strict";
  let setting = {
    source: "json",
    place: $("#timeline-wrap"),
    search: false,
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

    renderRow: function(place, datesArray, data, rowHead, rowAction) {
      const row = $('<div class="timeline__row">');
      place.append(row);
      const headCell = $('<div class="timeline__cell">');
      row.append(headCell);
      console.log(rowHead);

      const cellsWrap = $('<div class="timeline__cells-wrap">');
      row.append(cellsWrap);
    },
    init: function(props) {
      if (props) {
        setting = Timeline.extendObject(setting, props);
      }
      const dates = this.getDaysArray();

      const { source, render, place } = setting;

      const { rowHead, rowAction } = render;
      Timeline.renderRow(place, dates, source, rowHead, rowAction);
      // const tableHtml = source
      //   .map(item => {
      //     const rowHTML = render
      //       .map(row => {
      //         const cellVal = item[field];
      //         if (template) {
      //           const templateRow = template(item);
      //           if (templateRow) {
      //             return `<div class="timeline__cell"><div class="timeline__cell-content">${template(
      //               item
      //             )}</div></div>`;
      //           }
      //         }
      //         return `<div class="timeline__cell"><div class="timeline__cell-content">${cellTitle} ${cellVal}</div></div>`;
      //       })
      //       .join("");
      //     return `<div class="timeline__row">${rowHTML}</div>`;
      //   })
      //   .join("");

      // place.html(tableHtml);
    }
  };
})();

export default Timeline;
