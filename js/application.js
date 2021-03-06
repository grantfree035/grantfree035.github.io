(function() {
  
  var slcCnt = 0; // current slice count
  
  function addSlice() {
    //increment slice count
    ++slcCnt;
    
    // append div
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "slice");
    newDiv.setAttribute("id", "s" + slcCnt);
    document.getElementById("input").appendChild(newDiv);
    
    var newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    newDiv.appendChild(newRow);
    
    var grid3 = document.createElement("div");
    grid3.setAttribute("class", "col-md-12");
    newRow.appendChild(grid3);
    
    // append remove in ^div
    var newA = document.createElement("a");
    newA.setAttribute("class", "sliceRemove");
    newA.className += " pull-right";
    newA.setAttribute("href", "javascript:;");
    newA.innerHTML = "remove";
    grid3.appendChild(newA);
    
    newA.addEventListener("click", removeSlice, false);
    
    // append form in ^div
    var newForm = document.createElement("form");
    newDiv.appendChild(newForm)
    
    newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    newForm.appendChild(newRow);
    
    grid3 = document.createElement("div");
    grid3.setAttribute("class", "col-md-6");
    newRow.appendChild(grid3);
    
    // input > grid 3
    var newLab = document.createElement("label");
    newLab.setAttribute("class", "sliceLabel");
    newLab.innerHTML = "Label";
    grid3.appendChild(newLab);
    
    // input > grid3
    var newInp = document.createElement("input");
    newInp.setAttribute("type", "text");
    newInp.setAttribute("class", "form-control");
    newInp.setAttribute("placeholder", "i.e. homework");
    grid3.appendChild(newInp);
    
    newInp.addEventListener("change", setChartLabel, false);
    
    grid3 = document.createElement("div");
    grid3.setAttribute("class", "col-md-6");
    newRow.appendChild(grid3);
    
    // append label in ^form
    newLab = document.createElement("label");
    newLab.setAttribute("class", "sliceLabel");
    newLab.innerHTML = "Worth";
    grid3.appendChild(newLab);
    
    // append input in ^form
    newInp = document.createElement("input");
    newInp.setAttribute("type", "number");
    newInp.setAttribute("min", "0");
    newInp.setAttribute("class", "form-control");
    newInp.setAttribute("placeholder", "%");
    grid3.appendChild(newInp);
    
    newRow = document.createElement("div");
    newRow.setAttribute("class", "row");
    newForm.appendChild(newRow);
    
    grid3 = document.createElement("div");
    grid3.setAttribute("class", "col-md-6");
    newRow.appendChild(grid3);
    
    // append label in ^form
    newLab = document.createElement("label");
    newLab.setAttribute("class", "sliceLabel");
    newLab.innerHTML = "Number of Grades";
    grid3.appendChild(newLab);
    
    // append input in ^form
    newInp = document.createElement("input");
    newInp.setAttribute("type", "number");
    newInp.setAttribute("min", "0");
    newInp.setAttribute("class", "form-control");
    newInp.setAttribute("placeholder", "0");
    grid3.appendChild(newInp);
    
    newInp.addEventListener("change", setGradeStack, false);
    
    grid3 = document.createElement("div");
    grid3.setAttribute("class", "col-md-6");
    newRow.appendChild(grid3);
    
    // append label in ^form
    newLab = document.createElement("label");
    newLab.setAttribute("class", "sliceLabel");
    newLab.innerHTML = "# of Future Grades";
    grid3.appendChild(newLab);
    
    // append input in ^form
    newInp = document.createElement("input");
    newInp.setAttribute("type", "number");
    newInp.setAttribute("min", "0");
    newInp.setAttribute("class", "form-control");
    newInp.setAttribute("placeholder", "feature under-construction");
    newInp.setAttributeNode(document.createAttribute("disabled"));
    grid3.appendChild(newInp);
    
    newLab = document.createElement("div");
    newLab.setAttribute("class", "sliceLabel");
    newLab.innerHTML = "Grades"
    newLab.style.display = "none";
    newForm.appendChild(newLab);
    
    var newSubDiv = document.createElement("div");
    newSubDiv.setAttribute("class", "gradeStack");
    newForm.appendChild(newSubDiv);
  };
  
  function removeSlice() {
    --slcCnt
    var slice;
    for (slice = this.parentNode; slice.className != "slice"; slice = slice.parentNode);
    var parentDiv = slice.parentNode;
    parentDiv.removeChild(slice);
  };
  
  function setGradeStack() {
    var col = "col-lg-2";
    var size = 0;
    var num = this.value;
    var stack = this.parentNode.parentNode.parentNode.getElementsByClassName("gradeStack")[0];
    
    if (num != 0) {
      stack.previousSibling.style.display = "block";
    }
    else {
      stack.previousSibling.style.display = "none";
    }
    
    if (stack.hasChildNodes()) {
      size = stack.childNodes.length;
    }
    
    if (num > size) {
      var push = num - size;
      for (var i=0; i < push; ++i) {
        var newInp = document.createElement("input");
        newInp.setAttribute("type", "number");
        newInp.setAttribute("min", "0");
        newInp.setAttribute("class", "form-group");
        stack.appendChild(newInp);
      }
    } 
    else if (size > num) {
      var grd = stack.getElementsByClassName("form-group");
      for (var i=grd.length - 1; i >= num; --i) {
        grd[i].parentNode.removeChild(grd[i]);
      }
    } 
    else {}
  };
  
  function setChartLabel() {
    
  };
  
  // listen for Add Grade Slice button
  var addSliceBtn = document.getElementById("add-slice");
  addSliceBtn.addEventListener("click", addSlice, false);
  
  // resize graph canvas
  var graphDiv = document.getElementById("graph");
  var h = window.innerHeight * 0.9;
  var w = graphDiv.offsetWidth * 0.9;
  var cnvs = document.getElementById("barChart");
  cnvs.setAttribute("width", w.toString());
  cnvs.setAttribute("height", h.toString());
  
  // build bar chart
  Chart.defaults.global.scaleOverride = true;
  Chart.defaults.global.scaleSteps = 20;
  Chart.defaults.global.scaleStepWidth = 5;
  Chart.defaults.global.scaleStartValue = 0;
  var data = {
    labels: [],
    datasets: []
  };
  var options = {
    responsive: true
  }
  var ctx = document.getElementById("barChart").getContext("2d");
  var newChart = new Chart(ctx).Bar(data);

}());