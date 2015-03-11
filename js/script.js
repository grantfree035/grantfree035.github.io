(function() {
  var row_cnt = 0;
  
  // add a row when button is clicked
  var addRow = function() {
    var newdiv = document.createElement("div");
    row_cnt = row_cnt + 1;
    
    var newButton = document.createElement("button");
    newButton.setAttribute("class", "remove");
    newButton.innerHTML = "remove";
    newdiv.appendChild(newButton);
    
    newButton.addEventListener("click", removeRow, false);
    
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("class", "grd-port");
    newdiv.appendChild(newInput);
    
    newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("min", "0");
    newInput.setAttribute("class", "sizer");
    newdiv.appendChild(newInput);
    
    var newsubdiv = document.createElement("div");
    newsubdiv.setAttribute("align", "right");
    newsubdiv.setAttribute("class", "grades");
    newdiv.appendChild(newsubdiv);
    
    newInput.addEventListener("change", setGrdBoxes, false);
    
    document.getElementById("input-grds").appendChild(newdiv);
  };
  
  // remove row when button is clickes
  var removeRow = function () {
    this.removeEventListener("click", removeRow, false);
    var row = this.parentNode;
    var parent_div = row.parentNode;
    parent_div.removeChild(row);
    row_cnt = row_cnt - 1;
  };
  
  // add adjacent boxes to the respective row
  var setGrdBoxes = function() {
    var num = this.value;
    var row = this.parentNode;
    var div_grd = this.nextSibling;
    var grd_box = row.getElementsByClassName("grd-box");
    var grd_box_len = grd_box.length;
    alert("input: " + num + "\nlength: " + grd_box_len);
    
    if (num > grd_box_len) {
      for (var i=grd_box_len; i < num; ++i) {
        var new_inp = document.createElement("input");
        new_inp.setAttribute("type", "number");
        new_inp.setAttribute("min", "0");
        new_inp.setAttribute("class", "grd-box");
        div_grd.appendChild(new_inp);
      }
    } else {
      var c = div_grd.childNodes;
      for (var i=c.length - 1; i >= num; --i) {
        c[i].parentNode.removeChild(c[i]);
      }
    }
  };
  
  var addRowButton = document.getElementById("add");
  addRowButton.addEventListener("click", addRow, false);
  
}());