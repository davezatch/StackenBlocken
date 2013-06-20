var model = {
    context: {},
    cnv: {},
    angle: 0,
    width: 100,
    bgColor: "#ff0000"
};

$(document).ready(function(){
    //start the menu 
    $( '#stack' ).css( "background-color", "#000000" ).setUpCanvas();
});

jQuery.fn.setUpCanvas = function(){
    // setup canvas
    model.cnv = $( this )[0];
    model.context = model.cnv.getContext('2d'); 
   
    var cX, cY;
    var mX, mY = 0;
    var offX, offY;

    function contains(mx, my, currentX, currentY) {
      // All we have to do is make sure the Mouse X,Y fall in the area between
      // the shape's X and (X + Height) and its Y and (Y + Height)
      // console.log(mx);

      // model.context.rotate(model.angle);
      console.log(mx);
      console.log(currentX);
      console.log(currentX <= this.width + mx);

      var isContained = (this.x <= currentX) && (this.x + this.width >= currentX) &&
              (this.y <= currentY) && (this.y + this.height >= currentY);
        // console.log(isContained);
        return isContained;
    }
    
    //init canvas
    function updateRectangle(ang){
        model.context.clearRect(0, 0, 300, 300);
        model.cnv.width = model.cnv.width;
        
        offX = model.cnv.offsetLeft;
        offY = model.cnv.offsetTop;
        
        model.context.setTransform(1,0,0,1,0,0);
        this.x = 100;
        this.y = 100;
        this.width = model.width;
        this.height = 200;
        cX = x + width*0.5;
        cY = y + height*0.5;
        model.context.translate(x + .5*width, y + .5*height);
        model.context.rotate(ang);
        model.context.fillStyle = model.bgColor;
        model.context.fillRect(-0.5*width, -0.5*height, width, height);
    }
    updateRectangle(model.angle);// display the rectangle/square
    
    $( model.cnv ).mousedown(function(event){
        var currentX = event.clientX * Math.cos(-model.angle) - event.clientY * Math.sin(-model.angle);
          var currentY = event.clientX * Math.sin(-model.angle) + event.clientY * Math.cos(-model.angle);  

        var mx = event.clientX;
        var my = event.clientY;

          
        if (contains(mx, my, currentX, currentY)) {
        // if (contains(currentX, currentY)) {
            // calculate click angle minus the last angle
            var clickAngle = getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - model.angle;
            $( model.cnv ).bind("mousemove", clickAngle, function(event){
                // calculate move angle minus the angle onclick
                model.angle =  ( getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - clickAngle);


                updateRectangle(model.angle);
                updateCounter(Math.round(model.angle * 180 / Math.PI));
            });
        }
            // console.log(this.x);
    });
   
   /**
    * Remove listener
    */
    $( model.cnv ).mouseup(function(){
        $( model.cnv ).unbind("mousemove" );
    });
    
    /**
     * switch button for demonstration
     */
    $('#switchButton').toggle(
       function(){
          $(this).text("change to square");
          model.width = 150;
          model.bgColor = "#0000ff";
          updateRectangle(model.angle);
       },
       function(){
           $(this).text("change to rectangle");
           model.width = 100;
           model.bgColor = "#ff0000";
           updateRectangle(model.angle);
       });
   
};

/**
 * angle helper function
 */
function getAngle( cX, cY, mX, mY ){
    var angle = Math.atan2(mY - cY, mX - cX);
    return angle;
}

function updateCounter(angle) {
    $("#angle").text(angle);
}