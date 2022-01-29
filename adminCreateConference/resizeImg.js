function resizeImg(fileUploadId, outputImgId, resize_width=300, resize_height=250){

    //get the image selected
    var item = document.getElementById(fileUploadId).files[0];

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function(event) {
        var img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.name = event.target.name;//set name (optional)
        img.size = event.target.size;//set size (optional)
        img.onload = function(el) {
        var elem = document.createElement('canvas');//create a canvas

        //scale the image to (width) and keep aspect ratio
        var scaleFactor = determineImgScale(el.target.width, el.target.height, resize_width, resize_height);//resize_width / el.target.width;
        var newWidth = el.target.width * scaleFactor;
        var newHeight = el.target.height*scaleFactor;
        elem.width = resize_width;
        elem.height = resize_height;

        var centerImgW = elem.width/2 - newWidth/2;
        var centerImgH = elem.height/2 - newHeight/2;

        //draw in canvas
        var ctx = elem.getContext('2d');
        ctx.drawImage(el.target, centerImgW, centerImgH, newWidth, newHeight);

        //get the base64-encoded Data URI from the resize image
        var srcEncoded = ctx.canvas.toDataURL('image/png', 1);

        //assign it to thumb src
        document.getElementById(outputImgId).src = srcEncoded;

        /*Now you can send "srcEncoded" to the server and
        convert it to a png o jpg. Also can send
        "el.target.name" that is the file's name.*/

        }
    }
}
function determineImgScale(originalW, originalH, demandW, demandH) {
    var scaleFactor = demandW / originalW;
    if (originalH * scaleFactor > demandH) {
        // we're good
        return scaleFactor;
    } else {
        // we need to scale by height instead
        return demandH / originalH;
    }
}