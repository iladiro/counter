/*
  Version: 1.0.0
  Author: Iladiro
*/


const Counter = (function() {

  console.log("entrato");

  const _opts = Symbol();

  class Counter {

    constructor(opts) {

      console.log(opts);

      this.countdown_run = "";
      this.progressbar_run = "";

      const label_textes_default = {
        "days": "days",
        "hours": "hours",
        "minutes": "min",
        "seconds": "sec"
      }
      const expired_alert_default = "Time out"

      this.validation = this.checkAllFieldsPassed(opts);
      if(this.validation == undefined) {
        this.config = {
          "container": opts.container,
          "add_class_to_parent": opts.add_class_to_parent,
          "start_date": opts.start,
          "end_date": opts.end,
          "bg_color": opts.bg_color_class,
          "progressbar": opts.progressbar === false ? false : true,
          "countdown": opts.countdown === false ? false : true,
          "label_textes": opts.label_textes ? opts.label_textes : label_textes_default,
          "size_progressbar": opts.size_progressbar,
          "expired_alert": opts.expired_alert ? opts.expired_alert : expired_alert_default,
          "distance": ""
        }
      }

      // Selectors
      this.selectors = {
        "days_field": document.querySelector(this.config.container).querySelector('[data-counter="days"]'), //document.querySelector(this.config.container).querySelector('[data-counter="days"]'),
        "hours_field": document.querySelector(this.config.container).querySelector('[data-counter="hours"]'),
        "minutes_field": document.querySelector(this.config.container).querySelector('[data-counter="minutes"]'),
        "seconds_field": document.querySelector(this.config.container).querySelector('[data-counter="seconds"]'),
        "days_label": document.querySelector(this.config.container).querySelector('[data-counter="days_label"]'),
        "hours_label": document.querySelector(this.config.container).querySelector('[data-counter="hours_label"]'),
        "minutes_label": document.querySelector(this.config.container).querySelector('[data-counter="minutes_label"]'),
        "seconds_label": document.querySelector(this.config.container).querySelector('[data-counter="seconds_label"]'),
        "expired_alert": document.querySelector(this.config.container).querySelector('[data-counter="expired_alert"]'),
        "progress_bar": document.querySelector(this.config.container).querySelector('[data-counter="progress_bar"]'),
        "missing_field": document.querySelector(this.config.container).querySelector('[data-counter="missing"]'),
        "past_field": document.querySelector(this.config.container).querySelector('[data-counter="past"]'),
        "countdown": document.querySelector(this.config.container).querySelector('[data-counter="countdown"]')
      }
      // end
    }

    checkAllFieldsPassed(obj) {
      if(obj.container == "" || obj.container == undefined || obj.container == null) throw "container field is required";
      if(obj.start == "" || obj.start == undefined || obj.start == null) throw "start_date field is required";
      if(obj.end == "" || obj.end == undefined || obj.end == null) throw "end_date field is required";
    }

    getCurrentDate() {
      const today = new Date();
      const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      return {
        "date": date,
        "time": time,
        "date_time": date + ' ' + time
      }
    }

    convertToTimeStamp(value) {
      return new Date(value).getTime();
    }

    // Days

    // To calculate the no. of days between two dates
    calculateTotalDays() {
      return (
        this.convertToTimeStamp(this.config.end_date) -
        this.convertToTimeStamp(this.config.start_date)
      ) / (1000 * 3600 * 24);
    }

    calculatePastDays() {
      return (
        this.convertToTimeStamp(this.getCurrentDate().date_time) -
        this.convertToTimeStamp(this.config.start_date)
      ) / (1000 * 3600 * 24);
    }

    calculateMissingDays() {
      // return Math.ceil(this.config.total_days - this.calculatePastDays());
      return this.config.total_days - this.calculatePastDays();
    }

    // Time

    // To calculate the time difference of two dates
    calculateTotalTime() {
      return (
        this.convertToTimeStamp(this.config.end_date) -
        this.convertToTimeStamp(this.config.start_date)
      )
    }

    calculatePastTime() {
      return (
        this.convertToTimeStamp(this.getCurrentDate().date_time) -
        this.convertToTimeStamp(this.config.start_date)
      )
    }

    calculateMissingTime() {
      //return Math.ceil(this.config.total_time - this.calculatePastTime());
      return this.config.total_time - this.calculatePastTime();
    }

    percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    }

    calculatePercentageInTime() {
      return {
        "missing_days_percent": this.percentage(
          this.calculateMissingTime(), this.config.total_time
        ),
        "past_days_percent": this.percentage(
          this.calculatePastTime(), this.config.total_time
        )
      }
    }

    calculatePercentageInDays() {
      return {
        "missing_days_percent": this.percentage(
          this.calculateMissingDays(), this.config.total_days
        ),
        "past_days_percent": this.percentage(
          this.calculatePastDays(), this.config.total_days
        )
      }
    }

    countdown() {
      this.config.distance = this.calculateMissingTime();
      //console.log(distance);
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(this.config.distance / (1000 * 3600 * 24));
      const hours = Math.floor((this.config.distance % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((this.config.distance % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((this.config.distance % (1000 * 60)) / 1000);

      if(this.config.distance <= 0) {
        this.destroy(this.countdown_run);
        this.printExpiredText();
        return {
          "days": "0",
          "hours": "0",
          "minutes": "0",
          "seconds": "0"
        }
      } else {
        return {
          "days": days,
          "hours": hours,
          "minutes": minutes,
          "seconds": seconds
        }
      }
    }

    printExpiredText() {
      this.selectors.expired_alert.innerText = this.config.expired_alert;
      document.querySelector(this.config.container).classList.add("expired");
    }

    printTime(obj) {
      this.selectors.days_field.innerText = obj.days;
      this.selectors.hours_field.innerText = obj.hours;
      this.selectors.minutes_field.innerText = obj.minutes;
      this.selectors.seconds_field.innerText = obj.seconds;
    }

    printLabel() {
      this.selectors.days_label.innerText = this.config.label_textes.days;
      this.selectors.hours_label.innerText = this.config.label_textes.hours;
      this.selectors.minutes_label.innerText = this.config.label_textes.minutes;
      this.selectors.seconds_label.innerText = this.config.label_textes.seconds;
    }

    destroy(callback) {
      //console.log(callback);
      clearInterval(callback);
    }

    progressCounterBar() {
      this.config.distance = this.calculateMissingTime();
      const missing_perc = this.calculatePercentageInTime().missing_days_percent;
      const past_perc = this.calculatePercentageInTime().past_days_percent;

      if(this.config.distance <= 0) {
        this.destroy(this.progressbar_run);
        return {
          "missing": 0,
          "past": 100
        }
      } else {
        return {
          "missing": missing_perc,
          "past": past_perc
        }
      }
    }

    resizeProgressBarCounter(obj) {
      //console.log(obj);
      this.selectors.missing_field.style.width = obj.missing + "%";
      this.selectors.past_field.style.width = obj.past + "%";
    }

    progressbarSize() {
      if(this.config.size_progressbar != undefined || this.config.size_progressbar != null || this.config.size_progressbar != "") {
        if(this.config.size_progressbar == "xs") {
          this.selectors.progress_bar.classList.add("counter__bar--xs");
        } else if(this.config.size_progressbar == "sm") {
          this.selectors.progress_bar.classList.add("counter__bar--sm");
        } else if(this.config.size_progressbar == "md") {
          this.selectors.progress_bar.classList.add("counter__bar--md");
        } else if(this.config.size_progressbar == "lg") {
          this.selectors.progress_bar.classList.add("counter__bar--lg");
        }
      }
    }

    start() {
      const _this = this;

      this.config.total_days = this.calculateTotalDays();
      this.config.total_time = this.calculateTotalTime();

      this.printLabel();
      this.progressbarSize();

      if(this.config.add_class_to_parent) {
        document.querySelector(this.config.container).classList.add(this.config.add_class_to_parent);
      }

      if(this.config.countdown == true) {
        this.countdown_run = setInterval(function() {
          let obj = _this.countdown();
          _this.printTime(obj);
        }, 1000);
      } else {
        this.selectors.countdown.remove();
      }

      if(this.config.progressbar == true) {
        let run = this.progressCounterBar();
        this.resizeProgressBarCounter(run);

        this.progressbar_run = setInterval(function() {
          let obj = _this.progressCounterBar();
          _this.resizeProgressBarCounter(obj);
        }, 60000);
      } else {
        this.selectors.progress_bar.remove();
      }

    }

  }

  return Counter;
}());

var counter = new Counter(
  {
    "container": "#counter",
    "add_class_to_parent": "custom-count",
    "start": "2019/12/01 00:00:00",
    "end": "2019/12/24 18:56:00",
    "bg_color_class": "bg--orange",
    "progressbar": true,
    "countdown": true,
    "size_progressbar": "sm",
    "expired_alert": "L'offerta è scaduta",
    "label_textes": {
      "days": "Giorni",
      "hours": "Ore",
      "minutes": "Min",
      "seconds": "Sec"
    }
  }
)

counter.start();
