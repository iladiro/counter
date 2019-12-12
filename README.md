# Counter
Counter plugin with countdown and progress bar, flexible and easily customizable

# Before start
  
  1. [Download ZIP](https://github.com/iladiro/counter/archive/master.zip)
  2. First, copy and paste counter.js in your project, and link to it before the closing </body> element.
  3. Next, you need to copy and paste css into your project. We can include both SASS or CSS file.
  
  
# Getting Setup
  
  Instance the plugin, pass right configuration and call start() method.

      Required fields are:
      * container
      * start
      * end
      ```
      let counter = new Counter({
        "container": "#counter",
        "start": "2019/12/01 00:00:00",
        "end": "2020/12/11 16:30:00"
      });
      counter.start();
      ```
  
  Note: This plugin does not need jQuery.

# Options

  Other options are available besides the mandatory ones
  
  property | type | value | required | notes
  ------------ | -------------
  container | string | ex. #counter | yes | This field is mandatory
  start | string | ex. "2019/12/01 00:00:00" | yes | The format to be used is yyyy/mm/dd hh:mm:ss
  end | string | ex. "2019/12/31 00:00:00" | yes | The format to be used is yyyy/mm/dd hh:mm:ss
  progressbar | boolean | true or false | no | To show or not the progress bar. The field is not mandatory, but by default it is true
  countdown | boolean | true or false | no | To show or not the progress bar. The field is not mandatory, but by default it is true
  add_class_to_parent | string | ex. custom-counter | no | Just to customizing counter
  bg_color | string | ex. "orange" | no | In the css there is the basic color of the plugin, but with this property you can pass a class to overwrite the base color
  label_textes | object | ex. {
      "days": "Days",
      "hours": "Hours",
      "minutes": "Min",
      "seconds": "Sec"
    } | no | If nothing is passed the default is {
        "days": "days",
        "hours": "hours",
        "minutes": "min",
        "seconds": "sec"
      }
