# Counter
Counter plugin with countdown and progress bar, flexible and easily customizable

# Installation
  Make sure you've included jQuery first

  then

  ```
  npm install @iladiro/counter
  ```

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
