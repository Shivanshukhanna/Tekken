
(function() { "use strict"; 
  var Animation = function(frame_set, delay) {

    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set;

  };

  Animation.prototype = {

    change:function(frame_set, delay = 15) {

      if (this.frame_set != frame_set) {

        this.count = 0;
        this.delay = delay;
        this.frame_index = 0;
        this.frame_set = frame_set;
        this.frame = this.frame_set[this.frame_index];

      }

    },


    update:function() {

      this.count ++;

      if (this.count >= this.delay) {

        this.count = 0;
        this.frame_index = (this.frame_index == this.frame_set.length - 1) ? 0 : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index];

      }

    }

  };

  var buffer, controller, display, loop, player, render, resize, sprite_sheet;

  buffer = document.createElement("canvas").getContext("2d");
  display = document.querySelector("canvas").getContext("2d");

  
  controller = {

   
    left:  { active:false, state:false },
    right: { active:false, state:false },
    up:    { active:false, state:false },

    keyUpDown:function(event) {

     
      var key_state = (event.type == "keydown") ? true : false;

      switch(event.keyCode) {

        case 37:// left key

          
          if (controller.left.state != key_state) controller.left.active = key_state;
          controller.left.state  = key_state;

        break;
        case 38:// up key

          if (controller.up.state != key_state) controller.up.active = key_state;
          controller.up.state  = key_state;

        break;
        case 39:// right key

          if (controller.right.state != key_state) controller.right.active = key_state;
          controller.right.state  = key_state;

        break;

      }

      

    }

  };

 
  player = {

    animation:new Animation(),
    jumping:true,
    height:76,    width:136,
    x:0,          y:40 - 18,
    x_velocity:0, y_velocity:0

  };

 
  sprite_sheet = {

    frame_sets:[[0, 1, 2, 3, 4, 5, 6],[7,8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23,24]],// standing still, walk right, walk left
    image:new Image()

  };

  loop = function(time_stamp) {

    if (controller.up.active && !player.jumping) {

      controller.up.active = false;
      player.jumping = true;
      player.y_velocity -= 2.5;

    }

    if (controller.left.active) {

     
      player.animation.change(sprite_sheet.frame_sets[2], 9);
      player.x_velocity -= 0.2;

    }

    if (controller.right.active) {

      player.animation.change(sprite_sheet.frame_sets[1], 9);
      player.x_velocity += 0.2;

    }


    if (!controller.left.active && !controller.right.active) {

      player.animation.change(sprite_sheet.frame_sets[0], 9);

    }

    player.y_velocity += 0.25;

    player.x += player.x_velocity;
    player.y += player.y_velocity;
    player.x_velocity *= 0.9;
    player.y_velocity *= 0.9;

    if (player.y + player.height > buffer.canvas.height - 2) {

      player.jumping = false;
      player.y = buffer.canvas.height - 2 - player.height;
      player.y_velocity = 0;

    }

    if (player.x + player.width < 0) {

      player.x = buffer.canvas.width;

    } else if (player.x > buffer.canvas.width) {

      player.x = - player.width;

    }

    player.animation.update();

    render();

    window.requestAnimationFrame(loop);

  };

  render = function() {

    buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);

    buffer.drawImage(sprite_sheet.image, player.animation.frame * 76, 0, 76, 136, Math.floor(player.x), Math.floor(player.y), 136, 76);

    display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);

  };

  resize = function() {

    display.canvas.width = document.documentElement.clientWidth - 32;

    if (display.canvas.width > document.documentElement.clientHeight) {

      display.canvas.width = document.documentElement.clientHeight;

    }

    display.canvas.height = display.canvas.width * 0.5;

    display.imageSmoothingEnabled = false;

  };



  buffer.canvas.width = 800;
  buffer.canvas.height = 150;

  window.addEventListener("resize", resize);

  window.addEventListener("keydown", controller.keyUpDown);
  window.addEventListener("keyup", controller.keyUpDown);

  resize();

  sprite_sheet.image.addEventListener("load", function(event) {

    window.requestAnimationFrame(loop);

  });

  sprite_sheet.image.src = "/spritesheets/player1/spritesheet.png";

})();