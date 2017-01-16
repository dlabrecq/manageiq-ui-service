(function() {
  var out$ = typeof exports != 'undefined' && exports || typeof define != 'undefined' && {} || this;

  /**
   * @param {SVGElement} svg
   * @param {Function} callback
   * @param {jsPDF} callback.pdf
   * */
  out$.svg_to_pdf = function(svg, callback) {
    window.svg2png.svgAsDataUri(svg, {}, function(svg_uri) {
      var image = document.createElement('img');

      image.src = svg_uri;
      image.onload = function() {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        //var doc = new window.jsPDF('portrait', 'pt');
        //var doc = new window.jsPDF('landscape', 'pt', 'b0');
        var doc = new window.jsPDF('landscape', 'pt', 'a2');
        var dataUrl;

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        dataUrl = canvas.toDataURL('image/jpeg');
        //dataUrl = canvas.toDataURL('image/png');
        doc.addImage(dataUrl, 'JPEG', 0, 0, image.width, image.height);
        //doc.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height);

        callback(doc);
      }
    });
  }

  /**
   * @param {string} name Name of the file
   * @param {string} dataUriString
   */
  out$.download_pdf = function(name, dataUriString) {
    var link = document.createElement('a');
    link.addEventListener('click', function(ev) {
      link.href = dataUriString;
      link.download = name;
      document.body.removeChild(link);
    }, false);
    document.body.appendChild(link);
    link.click();
  }

  // if define is defined create as an AMD module
  if (typeof define !== 'undefined') {
    define(function() {
      return out$;
    });
  }
})();