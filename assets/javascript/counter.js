/*
  Version: 1.0.0
  Author: Iladiro
*/

class Counter {

  constructor(opts) {

    this.countdown_run = "";
    this.progressbar_run = "";

    this.validation = this.checkAllFieldsPassed(opts);
    if(this.validation == undefined) {
      this.config = {
        "container": opts.container,
        "start_date": opts.start,
        "end_date": opts.end,
        "add_class_to_parent": opts.add_class_to_parent ? opts.add_class_to_parent : undefined,
        "bg_color": opts.bg_color_class ? opts.bg_color_class : undefined,
        "progressbar": opts.progressbar === false ? false : true,
        "progressbar_percentage": opts.progressbar_percentage === false ? false : true,
        "progressbar_size": opts.progressbar_size ? opts.progressbar_size : undefined,
        "countdown": opts.countdown === false ? false : true,
        "labels": opts.labels ? opts.labels : undefined,
        "expired_alert": opts.expired_alert ? opts.expired_alert : undefined,
        "title": opts.title ? opts.title : undefined,
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
      "progressbar": document.querySelector(this.config.container).querySelector('[data-counter="progressbar"]'),
      "progressbar_percentage": document.querySelector(this.config.container).querySelector('[data-counter="progressbar_percentage"]'),
      "missing_field": document.querySelector(this.config.container).querySelector('[data-counter="missing"]'),
      "missing_percentage": document.querySelector(this.config.container).querySelector('[data-counter="missing_percentage"]'),
      "past_field": document.querySelector(this.config.container).querySelector('[data-counter="past"]'),
      "past_percentage": document.querySelector(this.config.container).querySelector('[data-counter="past_percentage"]'),
      "countdown": document.querySelector(this.config.container).querySelector('[data-counter="countdown"]'),
      "title": document.querySelector(this.config.container).querySelector('[data-counter="title"]')
    }
    // end
  }

  dateValidation(value) {
    const rejex = /[0-9]{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    var res = value.match(rejex);
    return (res) ? true : false;
  }

  checkAllFieldsPassed(obj) {
    if(obj.container == "" || obj.container == undefined || obj.container == null) throw "container field is required";
    if(obj.start == "" || obj.start == undefined || obj.start == null || (this.dateValidation(obj.start) === false)) throw "start_date field is required";
    if(obj.end == "" || obj.end == undefined || obj.end == null || (this.dateValidation(obj.end) === false)) throw "end_date field is required";
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
      if(this.config.expired_alert !== undefined) {
        if(this.selectors.expired_alert) {
          this.printExpiredText();
        } else {
          throw 'It was impossible to retrieve the selector (data-counter = "expired_alert").' +
          ' It is mandatory to insert them in the template if the "expired_alert" property is passed valued'
        }
      }
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
    if(this.config.expired_alert !== undefined) {
      this.selectors.expired_alert.innerText = this.config.expired_alert;
    }
    document.querySelector(this.config.container).classList.add("expired");
  }

  printTime(obj) {
    this.selectors.days_field.innerText = obj.days;
    this.selectors.hours_field.innerText = obj.hours;
    this.selectors.minutes_field.innerText = obj.minutes;
    this.selectors.seconds_field.innerText = obj.seconds;
  }

  printLabel() {
    if(this.config.labels !== undefined) {
      this.selectors.days_label.innerText = this.config.labels.days;
      this.selectors.hours_label.innerText = this.config.labels.hours;
      this.selectors.minutes_label.innerText = this.config.labels.minutes;
      this.selectors.seconds_label.innerText = this.config.labels.seconds;
    }
  }

  printTitle() {
    if(this.config.title !== undefined) {
      this.selectors.title.innerText = this.config.title;
    }
  }

  destroy(callback) {
    //console.log(callback);
    clearInterval(callback);
  }

  changeColorToProgressbar() {
    this.selectors.missing_field.classList.add(this.config.bg_color);
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

  resizeProgressCounterBar(obj) {
    //console.log(obj);
    this.selectors.missing_field.style.width = obj.missing + "%";
    this.selectors.past_field.style.width = obj.past + "%";

    // progressbar percentage
    if(this.config.progressbar_percentage) {
      if(this.selectors.missing_percentage && this.selectors.past_percentage) {
        this.selectors.missing_percentage.innerText = Math.round(obj.missing) + "%";
        this.selectors.past_percentage.innerText = Math.round(obj.past) + "%";
      } else {
        throw 'It was impossible to retrieve the selector (data-counter = "missing_percentage"),' +
        ' (data-counter = "past_percentage"). It is mandatory to insert them in' +
        ' the template if the "progressbar_percentage" is true'
      }
    } else {
      if(this.selectors.progressbar_percentage) {
        this.selectors.progressbar_percentage.remove();
      }
    }
    // end
  }

  progressbarSize() {
    if(this.config.progressbar_size == "xs") {
      this.selectors.progressbar.classList.add("counter__bar--xs");
    } else if(this.config.progressbar_size == "sm") {
      this.selectors.progressbar.classList.add("counter__bar--sm");
    } else if(this.config.progressbar_size == "md") {
      this.selectors.progressbar.classList.add("counter__bar--md");
    } else if(this.config.progressbar_size == "lg") {
      this.selectors.progressbar.classList.add("counter__bar--lg");
    }
  }

  start() {
    const _this = this;

    this.config.total_days = this.calculateTotalDays();
    this.config.total_time = this.calculateTotalTime();

    if(this.config.add_class_to_parent) {
      document.querySelector(this.config.container).classList.add(this.config.add_class_to_parent);
    }

    if(this.config.title !== undefined) {
      if(this.selectors.title) {
        this.printTitle();
      }
    }

    // Countdown block
    if(this.config.countdown) {
      if(this.config.labels !== undefined) {
        if(this.selectors.days_label && this.selectors.hours_label && this.selectors.minutes_label && this.selectors.seconds_label) {
          this.printLabel();
        } else {
          throw 'It was impossible to retrieve the selector (data-counter = "days_label"),' +
          ' (data-counter = "hours_label"), (data-counter = "minutes_label"),' +
          ' (data-counter = "seconds_label"). It is mandatory to insert them in' +
          ' the template if the "labels" property is passed valued'
        }
      }

      if(this.selectors.days_field && this.selectors.hours_field && this.selectors.minutes_field && this.selectors.seconds_field) {
        this.countdown_run = setInterval(function() {
          let obj = _this.countdown();
          _this.printTime(obj);
        }, 1000);
      } else {
        throw 'It was impossible to retrieve the selector (data-counter = "days"),' +
        ' (data-counter = "hours"), (data-counter = "minutes"),' +
        ' (data-counter = "seconds"). It is mandatory to insert them in' +
        ' the template.'
      }
    } else {
      if(this.selectors.countdown) {
        this.selectors.countdown.remove();
      }
    }
    // end

    // Progressbar
    if(this.config.progressbar) {

      if(this.config.progressbar_size !== undefined) {
        if(this.selectors.progressbar) {
          this.progressbarSize();
        } else {
          throw 'It was impossible to retrieve the selector (data-counter = "progressbar").' +
          ' It is mandatory to insert them in the template if the "progressbar_size"' +
          ' property is passed valued'
        }
      }

      if(this.config.bg_color !== undefined) {
        if(this.selectors.missing_field) {
          this.changeColorToProgressbar();
        } else {
          throw 'It was impossible to retrieve the (data-counter = "missing")' +
                ' selector. It is mandatory to insert' +
                ' it in the template if the "progressbar" property is not passed' +
                ' to false or is passed to true because the default is true'
        }
      }

      let run = this.progressCounterBar();

      if(this.selectors.missing_field && this.selectors.past_field) {
        this.resizeProgressCounterBar(run);
        this.progressbar_run = setInterval(function() {
          let obj = _this.progressCounterBar();
          _this.resizeProgressCounterBar(obj);
        }, 60000);
      } else {
        throw 'It was impossible to retrieve the (data-counter = "missing")' +
              ' and (data-counter = "past") selectors. It is mandatory to insert' +
              ' them in the template if the "progressbar" property is not passed' +
              ' to false or is passed to true because the default is true'
      }
    } else {
      if(this.selectors.progressbar) {
        this.selectors.progressbar.remove();
      }
    }
    // end

  }

}


/* const Counter = (function() {

  class Counter {

    constructor(opts) {

      this.countdown_run = "";
      this.progressbar_run = "";

      this.validation = this.checkAllFieldsPassed(opts);
      if(this.validation == undefined) {
        this.config = {
          "container": opts.container,
          "start_date": opts.start,
          "end_date": opts.end,
          "add_class_to_parent": opts.add_class_to_parent ? opts.add_class_to_parent : undefined,
          "bg_color": opts.bg_color_class ? opts.bg_color_class : undefined,
          "progressbar": opts.progressbar === false ? false : true,
          "progressbar_percentage": opts.progressbar_percentage === false ? false : true,
          "progressbar_size": opts.progressbar_size ? opts.progressbar_size : undefined,
          "countdown": opts.countdown === false ? false : true,
          "labels": opts.labels ? opts.labels : undefined,
          "expired_alert": opts.expired_alert ? opts.expired_alert : undefined,
          "title": opts.title ? opts.title : undefined,
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
        "progressbar": document.querySelector(this.config.container).querySelector('[data-counter="progressbar"]'),
        "progressbar_percentage": document.querySelector(this.config.container).querySelector('[data-counter="progressbar_percentage"]'),
        "missing_field": document.querySelector(this.config.container).querySelector('[data-counter="missing"]'),
        "missing_percentage": document.querySelector(this.config.container).querySelector('[data-counter="missing_percentage"]'),
        "past_field": document.querySelector(this.config.container).querySelector('[data-counter="past"]'),
        "past_percentage": document.querySelector(this.config.container).querySelector('[data-counter="past_percentage"]'),
        "countdown": document.querySelector(this.config.container).querySelector('[data-counter="countdown"]'),
        "title": document.querySelector(this.config.container).querySelector('[data-counter="title"]')
      }
      // end
    }

    dateValidation(value) {
      const rejex = /[0-9]{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
      var res = value.match(rejex);
      return (res) ? true : false;
    }

    checkAllFieldsPassed(obj) {
      if(obj.container == "" || obj.container == undefined || obj.container == null) throw "container field is required";
      if(obj.start == "" || obj.start == undefined || obj.start == null || (this.dateValidation(obj.start) === false)) throw "start_date field is required";
      if(obj.end == "" || obj.end == undefined || obj.end == null || (this.dateValidation(obj.end) === false)) throw "end_date field is required";
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
        if(this.config.expired_alert !== undefined) {
          if(this.selectors.expired_alert) {
            this.printExpiredText();
          } else {
            throw 'It was impossible to retrieve the selector (data-counter = "expired_alert").' +
            ' It is mandatory to insert them in the template if the "expired_alert" property is passed valued'
          }
        }
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
      if(this.config.expired_alert !== undefined) {
        this.selectors.expired_alert.innerText = this.config.expired_alert;
      }
      document.querySelector(this.config.container).classList.add("expired");
    }

    printTime(obj) {
      this.selectors.days_field.innerText = obj.days;
      this.selectors.hours_field.innerText = obj.hours;
      this.selectors.minutes_field.innerText = obj.minutes;
      this.selectors.seconds_field.innerText = obj.seconds;
    }

    printLabel() {
      if(this.config.labels !== undefined) {
        this.selectors.days_label.innerText = this.config.labels.days;
        this.selectors.hours_label.innerText = this.config.labels.hours;
        this.selectors.minutes_label.innerText = this.config.labels.minutes;
        this.selectors.seconds_label.innerText = this.config.labels.seconds;
      }
    }

    printTitle() {
      if(this.config.title !== undefined) {
        this.selectors.title.innerText = this.config.title;
      }
    }

    destroy(callback) {
      //console.log(callback);
      clearInterval(callback);
    }

    changeColorToProgressbar() {
      this.selectors.missing_field.classList.add(this.config.bg_color);
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

    resizeProgressCounterBar(obj) {
      //console.log(obj);
      this.selectors.missing_field.style.width = obj.missing + "%";
      this.selectors.past_field.style.width = obj.past + "%";

      // progressbar percentage
      if(this.config.progressbar_percentage) {
        if(this.selectors.missing_percentage && this.selectors.past_percentage) {
          this.selectors.missing_percentage.innerText = Math.round(obj.missing) + "%";
          this.selectors.past_percentage.innerText = Math.round(obj.past) + "%";
        } else {
          throw 'It was impossible to retrieve the selector (data-counter = "missing_percentage"),' +
          ' (data-counter = "past_percentage"). It is mandatory to insert them in' +
          ' the template if the "progressbar_percentage" is true'
        }
      } else {
        if(this.selectors.progressbar_percentage) {
          this.selectors.progressbar_percentage.remove();
        }
      }
      // end
    }

    progressbarSize() {
      if(this.config.progressbar_size == "xs") {
        this.selectors.progressbar.classList.add("counter__bar--xs");
      } else if(this.config.progressbar_size == "sm") {
        this.selectors.progressbar.classList.add("counter__bar--sm");
      } else if(this.config.progressbar_size == "md") {
        this.selectors.progressbar.classList.add("counter__bar--md");
      } else if(this.config.progressbar_size == "lg") {
        this.selectors.progressbar.classList.add("counter__bar--lg");
      }
    }

    start() {
      const _this = this;

      this.config.total_days = this.calculateTotalDays();
      this.config.total_time = this.calculateTotalTime();

      if(this.config.add_class_to_parent) {
        document.querySelector(this.config.container).classList.add(this.config.add_class_to_parent);
      }

      if(this.config.title !== undefined) {
        if(this.selectors.title) {
          this.printTitle();
        }
      }

      // Countdown block
      if(this.config.countdown) {
        if(this.config.labels !== undefined) {
          if(this.selectors.days_label && this.selectors.hours_label && this.selectors.minutes_label && this.selectors.seconds_label) {
            this.printLabel();
          } else {
            throw 'It was impossible to retrieve the selector (data-counter = "days_label"),' +
            ' (data-counter = "hours_label"), (data-counter = "minutes_label"),' +
            ' (data-counter = "seconds_label"). It is mandatory to insert them in' +
            ' the template if the "labels" property is passed valued'
          }
        }

        if(this.selectors.days_field && this.selectors.hours_field && this.selectors.minutes_field && this.selectors.seconds_field) {
          this.countdown_run = setInterval(function() {
            let obj = _this.countdown();
            _this.printTime(obj);
          }, 1000);
        } else {
          throw 'It was impossible to retrieve the selector (data-counter = "days"),' +
          ' (data-counter = "hours"), (data-counter = "minutes"),' +
          ' (data-counter = "seconds"). It is mandatory to insert them in' +
          ' the template.'
        }
      } else {
        if(this.selectors.countdown) {
          this.selectors.countdown.remove();
        }
      }
      // end

      // Progressbar
      if(this.config.progressbar) {

        if(this.config.progressbar_size !== undefined) {
          if(this.selectors.progressbar) {
            this.progressbarSize();
          } else {
            throw 'It was impossible to retrieve the selector (data-counter = "progressbar").' +
            ' It is mandatory to insert them in the template if the "progressbar_size"' +
            ' property is passed valued'
          }
        }

        if(this.config.bg_color !== undefined) {
          if(this.selectors.missing_field) {
            this.changeColorToProgressbar();
          } else {
            throw 'It was impossible to retrieve the (data-counter = "missing")' +
                  ' selector. It is mandatory to insert' +
                  ' it in the template if the "progressbar" property is not passed' +
                  ' to false or is passed to true because the default is true'
          }
        }

        let run = this.progressCounterBar();

        if(this.selectors.missing_field && this.selectors.past_field) {
          this.resizeProgressCounterBar(run);
          this.progressbar_run = setInterval(function() {
            let obj = _this.progressCounterBar();
            _this.resizeProgressCounterBar(obj);
          }, 60000);
        } else {
          throw 'It was impossible to retrieve the (data-counter = "missing")' +
                ' and (data-counter = "past") selectors. It is mandatory to insert' +
                ' them in the template if the "progressbar" property is not passed' +
                ' to false or is passed to true because the default is true'
        }
      } else {
        if(this.selectors.progressbar) {
          this.selectors.progressbar.remove();
        }
      }
      // end

    }

  }

  return Counter;
}()); */
