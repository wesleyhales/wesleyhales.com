self.onmessage = function(event) {
  // Do some work.
  event.window.localStorage.mydata = 'yomama';
  self.postMessage("recv'd: " + event.window);
  
};