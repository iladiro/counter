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
      "days_field": $(this.config.container).find('[data-counter="days"]'),
      "hours_field": $(this.config.container).find('[data-counter="hours"]'),
      "minutes_field": $(this.config.container).find('[data-counter="minutes"]'),
      "seconds_field": $(this.config.container).find('[data-counter="seconds"]'),
      "days_label": $(this.config.container).find('[data-counter="days_label"]'),
      "hours_label": $(this.config.container).find('[data-counter="hours_label"]'),
      "minutes_label": $(this.config.container).find('[data-counter="minutes_label"]'),
      "seconds_label": $(this.config.container).find('[data-counter="seconds_label"]'),
      "expired_alert": $(this.config.container).find('[data-counter="expired_alert"]'),
      "progress_bar": $(this.config.container).find('[data-counter="progress_bar"]'),
      "missing_field": $(this.config.container).find('[data-counter="missing"]'),
      "past_field": $(this.config.container).find('[data-counter="past"]'),
      "countdown": $(this.config.container).find('[data-counter="countdown"]')
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
      console.log("scaduto");
      this.myStopFunction(this.countdown_run);
      this.printExpiredText();
      return {
        "days": "0",
        "hours": "0",
        "minutes": "0",
        "seconds": "0"
      }
    } else {
      console.log("ancora valido");
      return {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
      }
    }
  }

  printExpiredText() {
    //$(this.config.container).find('[data-counter="countdown"]').remove();
    $(this.selectors.expired_alert).text(this.config.expired_alert);
    // $(this.selectors.expired_alert).show();
    $(this.config.container).addClass("expired");
  }

  printTime(obj) {
    $(this.selectors.days_field).text(obj.days);
    $(this.selectors.hours_field).text(obj.hours);
    $(this.selectors.minutes_field).text(obj.minutes);
    $(this.selectors.seconds_field).text(obj.seconds);
  }

  printLabel() {
    $(this.selectors.days_label).text(this.config.label_textes.days);
    $(this.selectors.hours_label).text(this.config.label_textes.hours);
    $(this.selectors.minutes_label).text(this.config.label_textes.minutes);
    $(this.selectors.seconds_label).text(this.config.label_textes.seconds);
  }

  myStopFunction(callback) {
    //console.log(callback);
    clearInterval(callback);
  }

  progressCounterBar() {
    this.config.distance = this.calculateMissingTime();
    const missing_perc = this.calculatePercentageInTime().missing_days_percent;
    const past_perc = this.calculatePercentageInTime().past_days_percent;

    if(this.config.distance <= 0) {
      console.log("scaduto");
      this.myStopFunction(this.progressbar_run);
      return {
        "missing": 0,
        "past": 100
      }
    } else {
      console.log("non scaduto");
      return {
        "missing": missing_perc,
        "past": past_perc
      }
    }
  }

  resizeProgressBarCounter(obj) {
    //console.log(obj);
    $(this.selectors.missing_field).css("width", obj.missing + "%");
    $(this.selectors.missing_field).addClass(this.config.bg_color);
    $(this.selectors.past_field).css("width", obj.past + "%");
  }

  progressbarSize() {
    if(this.config.size_progressbar != undefined || this.config.size_progressbar != null || this.config.size_progressbar != "") {
      if(this.config.size_progressbar == "xs") {
        $(this.selectors.progress_bar).addClass("counter__bar--xs");
      } else if(this.config.size_progressbar == "sm") {
        $(this.selectors.progress_bar).addClass("counter__bar--sm");
      } else if(this.config.size_progressbar == "md") {
        $(this.selectors.progress_bar).addClass("counter__bar--md");
      } else if(this.config.size_progressbar == "lg") {
        $(this.selectors.progress_bar).addClass("counter__bar--lg");
      }
    }
  }

  init() {
    const _this = this;

    this.config.total_days = this.calculateTotalDays();
    this.config.total_time = this.calculateTotalTime();

    this.printLabel();
    this.progressbarSize();

    if(this.config.add_class_to_parent) {
      $(this.config.container).addClass(this.config.add_class_to_parent);
    }

    if(this.config.countdown == true) {
      console.log("countdown true");
      this.countdown_run = setInterval(function() {
        let obj = _this.countdown();
        _this.printTime(obj);
      }, 1000);
    } else {
      console.log("countdown false");
      $(this.selectors.countdown).remove();
    }

    if(this.config.progressbar == true) {
      console.log("progressbar true");
      let run = this.progressCounterBar();
      this.resizeProgressBarCounter(run);

      this.progressbar_run = setInterval(function() {
        let obj = _this.progressCounterBar();
        _this.resizeProgressBarCounter(obj);
      }, 60000);
    } else {
      console.log("progressbar false");
      $(this.selectors.progress_bar).remove();
    }

  }

}

$(document).ready(function() {
  let counter = new Counter({
    "container": "#counter",
    "add_class_to_parent": "custom-count",
    "start": "2019/12/01 00:00:00",
    "end": "2020/12/11 16:30:00",
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
  });
  console.log(counter);
  counter.init();
});
