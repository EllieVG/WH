$(funtion (){
  loadScript('js/pay.js', paySetup)
});

var paySetup = function (){
  console.log('pay activo')
}

funtion loadScript (url, callback) {

  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.scr = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
  
}
