# Counter
Counter plugin with countdown and progress bar, flexible and easily customizable

# Before start
  
  1. [Download ZIP](https://github.com/iladiro/counter/archive/master.zip)
  2. First, copy and paste counter.js in your project, and link to it before the closing </body> element.
  3. Next, you need to copy and paste css into your project. We can include both SASS or CSS file.
  
  
# Getting Setup
  
  Instance the plugin, pass right configuration and call start() method.

      ```
      let counter = new Counter({
        "container": "#counter",
        "start": "2019/12/01 00:00:00",
        "end": "2020/12/11 16:30:00"
      });
      counter.start();
      ```
  
  Note: This plugin does not need jQuery.
  
# Template
```
<div class="i-counter" id="counter">
    <h3 class="i-counter__title" data-counter="title">
      Remaining time offered
    </h3>
    <div class="i-counter__bar" data-counter="progress_bar">
      <span class="i-counter__bar--missing" data-counter="missing"></span>
      <span class="i-counter__bar--past" data-counter="past">
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


# Options

  Other options are available besides the mandatory ones
  
  property | type | required | default | notes
  ------------ | ------------- | ------------- | ------------- | -------------
  container | ``` string ``` | yes | ``` undefined ``` | This field is mandatory
  start | ``` string ``` | yes | ``` undefined ``` | The format to be used is yyyy/mm/dd hh:mm:ss
  end | ``` string ``` | yes | ``` undefined ``` | The format to be used is yyyy/mm/dd hh:mm:ss
  progressbar | ``` boolean ``` | no | ``` true ``` | To show or not the progress bar. The field is not mandatory, but by default it is true
  countdown | ``` boolean ``` | no | ``` true ``` | To show or not the progress bar. The field is not mandatory, but by default it is true
  add_class_to_parent | ``` string ``` | no | ``` undefined ``` | Just to customizing counter
  bg_color | ``` string ``` | no | ``` undefined ``` | In the css there is the basic color of the plugin, but with this property you can pass a class to overwrite the base color
  label_textes | ``` object ``` | no | "Days", "Hours", "Min", "Sec" | If nothing is passed the default is "Days", "Hours", "Min", "Sec". This is the object you expect:  ``` {  "days": "", "hours": "", "minutes": "", "seconds": "" }  ```
  expired_alert | ``` "string" ``` | no | Time out | if no value is passed, the default value is the one passed in the default column
