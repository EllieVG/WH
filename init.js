$(funtion (){
  loadScript()
})

funtion loadScript (url, callback) {

  var head = document.head
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.scr = url
  script.onreadystatechange = callback
  script.onload = callback
  head.appendChild(script)
  
}
