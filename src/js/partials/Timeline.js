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
    showItems: 3,
    now: moment(new Date().setHours(0, 0, 0, 0))._d
  };
  let sourceArr = [];
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
    getRow: function(datesArray, actionsHTML, id) {
      // create table row
      let row = `<div class="timeline__row" data-row-id="${id}">`;
      const width = setting.cellWidth;
      for (let i = 0; i < datesArray.length; i++) {
        const cellDay = `<div class="timeline__cell" style="width: ${width}px"></div>`;

        row += cellDay;
      }
      row += `${actionsHTML}</div>`;

      return row;
    },
    getStart: function(now, startTime) {
      let days = Math.floor(moment.duration(startTime.diff(now)).asDays());
      const isAm =
        moment(startTime)
          .format("hA")
          .indexOf("AM") !== -1;

      days += isAm ? 0 : 0.5;

      return days;
    },
    getEndTimeCellNumber: function(from, to) {
      const isFromAm = from.format("hA").indexOf("AM") !== -1;
      const isToAm = to.format("hA").indexOf("AM") !== -1;

      const formatFrom = moment(from._d.setHours(!isFromAm ? 12 : 0, 0, 0, 0));
      const formatTo = moment(to._d.setHours(!isToAm ? 12 : 0, 0, 0, 0));

      let cells = moment.duration(formatTo.diff(formatFrom)).asDays();

      cells += 0.5;

      return cells;
    },

    getRowActions: function(row, rowId, actionsTemplate, actionsAttrs) {
      const actionsHTML = Object.keys(row.actions)
        .map(currentKey => {
          const action = row.actions[currentKey];

          const from = moment(action.dates[0]);
          const to = moment(action.dates[1]);

          const { type } = action;

          const actionStart = Timeline.getStart(setting.now, from);

          const duration = Timeline.getEndTimeCellNumber(from, to);

          const start = actionStart + setting.daysBefore;
          const left = start * setting.cellWidth;

          const maxWidth = duration * setting.cellWidth;

          let data = `data-action-id="${currentKey}" data-start="${start}" data-duration="${duration}" data-from="${from.format(
            "YYYY-MM-DDTHH:mm:ss"
          )}"`;

          let attrsAction = "";
          if (type) {
            const attrsObj = actionsAttrs[type];
            attrsAction +=
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

          return `<div class="timeline__action-wrap js_timeline-action" style="left: ${left}px; width: ${maxWidth}px;" ${data}><div ${attrsAction}>
        <div class="timeline__action-content">
          ${actionsTemplate(action)}
        </div>
        </div></div>`;
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

      Object.keys(data).map((index, id) => {
        const item = data[index];

        tableLeftHTML += `<div class="timeline__row" data-row-id="${index}">${titlesTemplate(
          item,
          index
        )}</div>`;

        const actionsHTML = Timeline.getRowActions(
          item,
          id,
          actionsTemplate,
          actionsAttrs
        );
        tableBodyHTML += Timeline.getRow(datesArray, actionsHTML, index);
        itemNewActions += `<div class="timeline__row" data-row-id="${index}"><div class="timeline__new-action" data-id="${index}">
        ${actionTemplate(item)}
        </div></div>`;
      });

      // tableBodyHTML += datesRow;

      tableHTML =
        `<div class="timeline__left">${tableLeftHTML}</div>` +
        `<div class="timeline__body"><div class="timeline__body-wrap" style="width:${rowWidth}px">${tableBodyHTML}</div></div><div class="timeline__right">${itemNewActions}</div>`;

      place.html(tableHTML);
    },

    events: function() {
      $(document).on("click", ".js_timeline-action", function(e) {
        e.preventDefault();
        e.stopPropagation();
        const _this = $(this);

        const actions = $(".js_timeline-action");
        actions.removeClass("is-open");

        _this.toggleClass("is-open");
      });
      $(document).on("click", ".js_pagination-btn", function() {
        const _this = $(this);
        const dataID = _this.data("target-id");
        Timeline.showActiveTimeline(dataID);
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
    hoverRowEvent: function() {
      $("[data-row-id]").hover(
        function() {
          const _this = $(this);
          const id = _this.data("row-id");
          $(`[data-row-id="${id}"]`).addClass("is-active");
        },
        () => {
          $("[data-row-id]").removeClass("is-active");
        }
      );
    },
    testHitResize: function(row, newStart, newEnd, onSuccess, onError) {
      const actions = row.find(".js_timeline-action:not(.js_current-interact)");
      let errorsCount = 0;
      $.each(actions, function(i, el) {
        const _el = $(el);
        const start = _el.data("start");
        if (start && newEnd > start && newStart < start) {
          errorsCount += 1;
        }
      });
      if (errorsCount > 0) {
        onError();
      } else {
        const newDuration = newEnd - newStart;
        if (confirm("Are you sure?")) {
          onSuccess(newDuration);
        } else {
          onError();
        }
      }
    },
    testHit: function(row, newStart, newEnd, onSuccess, onError) {
      const actions = row.find(".js_timeline-action:not(.js_current-interact)");
      // console.log(actions);
      let errorsCount = 0;
      $.each(actions, function(i, el) {
        const _el = $(el);
        const start = _el.data("start");
        const end = +start + _el.data("duration");
        if (
          (newStart >= start && newEnd < end) ||
          (newEnd > start && newStart < start) ||
          (newStart < end && newStart >= start)
        ) {
          errorsCount += 1;
        }
      });
      if (errorsCount > 0) {
        onError();
      } else {
        if (confirm("Are you sure?")) {
          onSuccess(newStart);
        } else {
          onError();
        }
      }
    },
    dragEvents: function(selector) {
      let startLeft = 0;
      let fromDateNode, toDateNode;
      let parentRow = "";
      let target = "";
      let actionID = "";
      let parentRowID = "";

      $(selector).draggable({
        axis: "x",
        grid: [setting.cellWidth / 2, 0],
        start: function(event, ui) {
          startLeft = ui.position.left;
          target = $(event.target);
          parentRow = target.closest("[data-row-id]");
          actionID = target.data("action-id");
          fromDateNode = target.find(".js_from-date");
          toDateNode = target.find(".js_to-date");
          parentRow.addClass("row-interact");
          parentRowID = parentRow.data("row-id");
          target.addClass("js_current-interact");
        },
        stop: function(event, ui) {
          const dataDuration = target.data("duration");
          const start = target.data("start");
          const newStart = ui.position.left / setting.cellWidth;
          const newEnd = +newStart + dataDuration;
          if (start !== newStart) {
            Timeline.testHit(
              parentRow,
              newStart,
              newEnd,
              newStart => {
                const left = ui.position.left - startLeft;
                const hours = (left / setting.cellWidth) * 24;
                const fromDate = new Date(target.data("from"));

                let time = dataDuration * 24 - 12;

                const newDate = moment(fromDate).add(hours, "hours");
                const newDateFormat = newDate.format("YYYY-MM-DDTHH:mm:ss");

                const endDate = moment(newDate).add(time, "hours");
                const endDateFormat = endDate.format("YYYY-MM-DDTHH:mm:ss");

                const newKeyValue = [newDateFormat, endDateFormat];
                setting.source[parentRowID].actions[
                  actionID
                ].dates = newKeyValue;

                target.data("from", newDateFormat);
                target.data("start", newStart);

                fromDateNode.html(newDate.format("DD.MM (A)"));
                toDateNode.html(endDate.format("DD.MM (A)"));
              },
              () => {
                target.css("left", startLeft);
              }
            );
          }
          parentRow.removeClass("row-interact");
          // target.removeClass("is-open");
          target.removeClass("js_current-interact");
        }
      });
    },

    resizeEvents: function(selector) {
      let target = "";
      let toDateNode;
      let parentRow = "";
      let startSize = 0;
      let actionID = "";
      let parentRowID = "";
      $(selector).resizable({
        handles: "e",
        grid: setting.cellWidth / 2,
        start: function(event, ui) {
          target = $(event.target);
          actionID = target.data("action-id");
          toDateNode = target.find(".js_to-date");
          parentRow = target.closest("[data-row-id]");
          parentRowID = parentRow.data("row-id");
          parentRow.addClass("row-interact");
          target.addClass("is-resized");
          target.addClass("js_current-interact");
          startSize = ui.size.width;
        },
        stop: function(event, ui) {
          const dataDuration = +target.data("duration");
          const start = +target.data("start");
          const end = start + dataDuration;
          const newEnd = end + (ui.size.width - startSize) / setting.cellWidth;
          if (newEnd !== end) {
            Timeline.testHitResize(
              parentRow,
              start,
              newEnd,
              newDuration => {
                const fromDate = new Date(target.data("from"));

                let time = newDuration * 24 - 12;

                const endDate = moment(fromDate).add(time, "hours");
                const endDateFormat = endDate.format("YYYY-MM-DDTHH:mm:ss");
                setting.source[parentRowID].actions[
                  actionID
                ].dates[1] = endDateFormat;
                target.data("duration", newDuration);
                target.css("width", newDuration * setting.cellWidth);
                toDateNode.html(endDate.format("DD.MM (A)"));
              },
              () => {
                target.css("width", startSize);
              }
            );
          }
          target.removeClass("is-resized");
          parentRow.removeClass("row-interact");
          target.removeClass("js_current-interact");
        }
      });
    },

    reinit: function() {
      const { render, place } = setting;

      const { rowHead, rowAction, addActionTemplate } = render;

      Timeline.renderTimelines(
        place,
        rowHead,
        rowAction,
        addActionTemplate,
        sourceArr
      );

      Timeline.showActiveTimeline(0);

      Timeline.hoverRowEvent();
      Timeline.dragEvents(".js_timeline-action");
      Timeline.resizeEvents(".js_timeline-action");
    },
    sliceObject: function(obj, showItems) {
      const sourceKeys = Object.keys(obj);
      const sourceLength = sourceKeys.length;
      const tablesCount = Math.ceil(sourceLength / showItems);
      const result = [];
      let partIndex = 0;
      for (let i = 0; i < tablesCount; i++) {
        const part = sourceKeys.slice(partIndex, partIndex + showItems);
        const tempArr = [];
        for (let j = 0; j < part.length; j++) {
          const key = part[j];
          const objItem = `"${key}":${JSON.stringify(obj[key])}`;
          tempArr.push(objItem);
        }
        result.push(JSON.parse(`{${tempArr.join()}}`));

        partIndex += showItems;
      }
      return result;
    },
    renderTimelines: function(
      place,
      rowHead,
      rowAction,
      addActionTemplate,
      sourceArr
    ) {
      place.empty();
      const dates = this.getDaysArray();

      let pagination = $("<ul class='timeline__nav'></ul>");
      for (let i = 0; i < sourceArr.length; i++) {
        const timelineItem = $(
          `<div class="timeline" id="timeline-wrap-${i}">`
        );
        place.append(timelineItem);

        Timeline.renderTable(
          timelineItem,
          sourceArr[i],
          dates,
          rowHead,
          rowAction,
          addActionTemplate
        );
        pagination.append(
          `<li class="timeline__nav-item"><button class="js_pagination-btn timeline__nav-btn" data-target-id="${i}">${i +
            1}</button></li>`
        );
      }
      place.append(pagination);
    },
    showActiveTimeline: function(index) {
      $(".timeline").css("display", "none");
      $(`#timeline-wrap-${index}`).css("display", "");
    },
    init: function(props) {
      if (props) {
        setting = Timeline.extendObject(setting, props);
      }

      const { source, render, place } = setting;

      const { rowHead, rowAction, addActionTemplate } = render;

      sourceArr = Timeline.sliceObject(source, setting.showItems);

      Timeline.renderTimelines(
        place,
        rowHead,
        rowAction,
        addActionTemplate,
        sourceArr
      );
      Timeline.showActiveTimeline(0);
      Timeline.events();

      Timeline.hoverRowEvent();

      Timeline.dragEvents(".js_timeline-action");

      Timeline.resizeEvents(".js_timeline-action");

      return this;
    }
  };
})();

export default Timeline;
