/* eslint-env browser */

var $remove = document.getElementById('js-remove');

if ($remove) {
  $remove.addEventListener('click', remove);
}

function remove(ev) {
  var $node = ev.target;
  var request = new XMLHttpRequest();

  request.open('DELETE', '/' + $node.dataset.id);
  request.onload = onload;
  request.send();

  function onload() {
    if (request.status !== 200) {
      throw new Error('Could not delete: ' + request.statusText);
    }

    window.location = '/';
  }
}
