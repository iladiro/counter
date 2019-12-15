# Counter
Counter plugin with countdown and progress bar, flexible and easily customizable

# Before start

  1. [Download ZIP](https://github.com/iladiro/counter/archive/master.zip)
  2. First, copy and paste counter.js in your project, and link to it before the closing ```</body>``` element.
  3. Next, you need to copy and paste css into your project. We can include both SASS or CSS file.

# Getting Setup

  Instance the plugin, pass right configuration and call start() method.

  Note: This plugin does not need jQuery.

      ```
      let counter = new Counter({
        "container": "#counter",
        "start": "2019/12/01 00:00:00",
        "end": "2020/12/11 16:30:00"
      });
      counter.start();
      ```

# Template

This is the basic template, but through the data attributes, which you find in the code below, you can create another template

[DEMO](https://jsbin.com/qiwobev/edit?html,css,js,output)

```
<div class="i-counter" id="counter">
    <h3 class="i-counter__title" data-counter="title">
      Remaining time offered
    </h3>
    <div class="i-counter__progressbar" data-counter="progressbar">
      <div class="i-counter__progressbar-line">
        <span class="i-counter__progressbar-line-missing" data-counter="missing"></span>
        <span class="i-counter__progressbar-line-past" data-counter="past">
      </div>
      <div class="i-counter__progressbar-percentage" data-counter="progressbar_percentage">
        <span class="i-counter__progressbar-percentage-missing" data-counter="missing_percentage">0%</span>
        <span class="i-counter__progressbar-percentage-past" data-counter="past_percentage">0%</span>
      </div>
    </div>
    <div class="i-counter__countdown">
      <div class="i-counter__countdown-time" data-counter="countdown">
        <div>
          <p class="i-counter__countdown-value" data-counter="days">0</p>
          <label class="i-counter__countdown-label" data-counter="days_label">days</label>
        </div>
        <div>
          <p class="i-counter__countdown-value" data-counter="hours">0</p>
          <label class="i-counter__countdown-label" data-counter="hours_label">hours</label>
        </div>
        <div>
          <p class="i-counter__countdown-value" data-counter="minutes">0</p>
          <label class="i-counter__countdown-label" data-counter="minutes_label">min</label>
        </div>
        <div>
          <p class="i-counter__countdown-value" data-counter="seconds">0</p>
          <label class="i-counter__countdown-label" data-counter="seconds_label">sec</label>
        </div>
      </div>
      <p class="i-counter__expired-alert" data-counter="expired_alert">Time out</p>
    </div>
  </div>

```
Another example of how you can use the plugin, building your own template [DEMO](https://jsbin.com/vuqajecini/edit?html,css,js,output)

# Data attribute

Below the data attributes to use in your template

**General**
  - **main counter title**: data-counter: "title"
  - **expired message**: data-counter: "expired_alert"

**Progressbar**:
  - **progressbar container**: data-counter: "progressbar",
  - **missing field**: data-counter="missing",
  - **past field**: data-counter="past",
  - **progressbar percentage container**: data-counter="progressbar_percentage",
  - **missing percentage**: data-counter="missing_percentage",
  - **past percentage**: data-counter="past_percentage",

**Countdown**:
  - **countdown container**: data-counter="countdown",
  - **days text**: data-counter="days",
  - **days label**: data-counter: "days_label",
  - **hours text**: data-counter="hours",
  - **hours label**: data-counter: "hours_label",
  - **minutes text**: data-counter="minutes",
  - **minutes label**: data-counter: "minutes_label",
  - **seconds text**: data-counter="seconds",
  - **seconds label**: data-counter: "seconds_label"


# Options

  Other options are available besides the mandatory ones

  property | type | required | default | notes
  ------------ | ------------- | ------------- | ------------- | -------------
  container | ``` string ``` | yes | ``` undefined ``` | This field is mandatory
  start | ``` string ``` | yes | ``` undefined ``` | The format to be used is yyyy/mm/dd hh:mm:ss
  end | ``` string ``` | yes | ``` undefined ``` | The format to be used is yyyy/mm/dd hh:mm:ss
  progressbar | ``` boolean ``` | no | ``` true ``` | To show or not the progress bar. The field is not mandatory, but by default it is true
  progressbar_percentage | ``` boolean ``` | no | ``` true ``` | To show or not the progress bar. The field is not mandatory, but by default it is true
  countdown | ``` boolean ``` | no | ``` true ``` | To show or not the progress bar. The field is not mandatory, but by default it is true
  add_class_to_parent | ``` string ``` | no | ``` undefined ``` | Just to customizing counter
  bg_color | ``` string ``` | no | ``` undefined ``` | In the css there is the basic color of the plugin, but with this property you can pass a class to overwrite the base color
  labels | ``` object ``` | no | "Days", "Hours", "Min", "Sec" | If nothing is passed the default is "Days", "Hours", "Min", "Sec". This is the object you expect:  ``` {  "days": "", "hours": "", "minutes": "", "seconds": "" }  ```
  expired_alert | ``` "string" ``` | no | Time out | if no value is passed, the default value is the one passed in the default column
  title | ``` "string" ``` | no | ``` undefined ``` | The "title" can be statically inserted into the template or dynamically by enhancing the "title" property and inserting the data attribute "data-counter = 'title'" into the template
