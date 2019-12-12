# Counter
Counter plugin with countdown and progress bar, flexible and easily customizable

# Installation
  Make sure you've included jQuery first

  then

  ```
  npm install @iladiro/counter
  ```

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

# Options

  Other options are available besides the mandatory ones
