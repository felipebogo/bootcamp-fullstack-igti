
function init() {
  var textR = document.querySelector('#text-r');
  var textG = document.querySelector('#text-g');
  var textB = document.querySelector('#text-b');
  var boxResult = document.querySelector('#box-result');


  function setText(range) {
    var text = range.parentElement.querySelector('input[type="text"]');
    text.value = range.value;
  }

  function rangeHandler(event) {
    setText(event.target);
    drawBoxResult();
  }

  function drawBoxResult() {
    boxResult.style.backgroundColor = `rgb(${textR.value},${textG.value},${textB.value})`;
  }

  var ranges = document.querySelectorAll('input[type=range]');
  ranges.forEach(range => {
    range.addEventListener('input', rangeHandler);
    setText(range);
  });
  drawBoxResult();
}
window.addEventListener('load', init);

