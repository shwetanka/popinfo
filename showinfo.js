
var InfoWin = function(element, options){
  this.options = options || {};
  this.element = element;
  this.showing = false;
  this.setData();
  this.template = $('<div class="info-win"><div class="info-title-bar"><h1>Title</h1><a href="#" class="close">&times;</a></div><div class="info-content"></div></div>');

  $(this.template).find('h1').html(this.title);
  $(this.template).find('div.info-content').html(this.content);

  var selfRef = this;
  $(this.element).on('click', function(ev){
    ev.preventDefault();
    if(!selfRef.showing){
      selfRef.show();
    }
  });
};

InfoWin.prototype.setData = function(){
  this.content = this.options.content ? this.options.content : 'No content set!';
  this.title = this.options.title ? this.options.title : 'Info Window';
};
InfoWin.prototype.show = function(){
  var selfRef = this;
  var pos = this.getPosition(this.element);
  var top = pos[0]-50;
  var left = pos[1]-40;
  $(this.template).css({top: top+"px", left: left+'px'});
  $(this.template).on('click', 'a.close', function(ev){
    ev.preventDefault();
    selfRef.hide();
  });
  $('body').append(this.template);
  this.showing = true;
};

InfoWin.prototype.getPosition = function findPos(obj) {
  var obj2 = obj;
  var curtop = 0;
  var curleft = 0;
  if (document.getElementById || document.all) {
    do  {
      curleft += obj.offsetLeft-obj.scrollLeft;
      curtop += obj.offsetTop-obj.scrollTop;
      obj = obj.offsetParent;
      obj2 = obj2.parentNode;
      while (obj2!=obj) {
        curleft -= obj2.scrollLeft;
        curtop -= obj2.scrollTop;
        obj2 = obj2.parentNode;
      }
    } while (obj.offsetParent)
  } else if (document.layers) {
    curtop += obj.y;
    curleft += obj.x;
  }
  return [curtop, curleft];
}

InfoWin.prototype.hide = function(){
  $('div.info-win').remove();
  this.showing = false;
};

(function( $ ){

  $.fn.showInfo = function(opts) {
    return this.each(function(){
      new InfoWin(this, opts);
    })
  };
})( jQuery );