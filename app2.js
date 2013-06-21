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
      // console.log(mx);
      console.group('current x and y ');
      console.log(currentX);
      console.log(currentY);
      console.groupEnd();
      console.group('this x and y ');
      console.log(this.width);
      console.log(this.height);
      console.groupEnd();

      // var test = currentX <= mx + this.width <= currentX - this.width;

    console.log(this.x <= currentX);
    console.log((+(this.x)) + this.width >= currentX);
    console.log(this.y <= currentY);
    console.log((+(this.y) * 2) + this.height >= currentY);

      // var isContained = (this.x <= currentX) && (this.x + this.width >= currentX) &&
      //         (this.y <= currentY) && (this.y + this.height >= currentY);
      var isContained = (this.x <= currentX) && ((+((this.x) * 2) + this.width >= currentX)) &&
              (this.y <= currentY) && (((+(this.y) * 2) + this.height >= currentY));

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

        this.firstX = -0.5*this.width;
        this.firstY = -0.5*this.height;

        cX = x + this.width*0.5;
        cY = y + this.height*0.5;
        model.context.translate(this.x + .5*this.width, this.y + .5*this.height);
        model.context.rotate(ang);
        model.context.fillStyle = model.bgColor;
        model.context.fillRect(this.firstX, this.firstY, this.width, this.height);
    }
    updateRectangle(model.angle);// display the rectangle/square
    
    $( model.cnv ).mousedown(function(event){
          console.log(model.angle);

        var mx = event.clientX;
        var my = event.clientY;
        var currentX = mx;
          var currentY = my;  

        console.log(this.x);

          
        if (contains(mx, my, currentX, currentY)) {
        // if (contains(currentX, currentY)) {
            // calculate click angle minus the last angle
            var clickAngle = getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - model.angle;
            $( model.cnv ).bind("mousemove", clickAngle, function(event){
                // calculate move angle minus the angle onclick
                model.angle =  ( getAngle( cX + offX, cY + offY, event.clientX, event.clientY  ) - clickAngle);

                currentX = mx * Math.cos(-model.angle) - my * Math.sin(-model.angle) - 10;
                  currentY = mx * Math.sin(-model.angle) + my * Math.cos(-model.angle - 10);  

                updateRectangle(model.angle);
                // updateCounter(Math.round(model.angle * 180 / Math.PI));
                updateCounter(model.angle);
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