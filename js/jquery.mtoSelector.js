/*
 * mtoSelector
 * Copyright 2011 Daine Trinidad
 */
(function( $ ){

      $.fn.mtoSelector = function(options) {
          
          var settings = {
                  'orientation'     : 'vertical',
                  'dropdown'        : false
          }
          if (options) { 
                $.extend( settings, options );
          }
          
          thisClass = this.attr('class');
          thisName = this.attr('name');
          thisID = this.attr('ID');
          this.css('display','none');
          
          mtoorientation = '';
          if(settings['orientation'] == 'horizontal'){
              mtoorientation = 'ui-mto-horizontal';
          }
          
          // Create div for new picker
          this.wrap('<div class="ui-mto '+thisClass+'" id="'+thisID+'" option="hidden"><div class="ui-mto-options '+mtoorientation+'"></div>');
          
          if(settings['orientation'] == 'vertical'){
              // Create up button
              this.parent().parent().prepend('<div class="ui-mto-up-button ui-mto-button mto-before"></div>');
              
              // Create bottom button
              this.parent().parent().append('<div class="ui-mto-down-button ui-mto-button mto-after"></div>');
          }else if(settings['orientation'] == 'horizontal'){
              // Create up button
              this.parent().parent().prepend('<div class="ui-mto-left-button ui-mto-button mto-before"></div>');
              
              // Create bottom button
              this.parent().parent().append('<div class="ui-mto-right-button ui-mto-button mto-after"></div>');
          }
          
          
          var elements = this.children();
          //console.log(this.children());
          elements.each(function(index){
              //console.log($(this).val()+"-"+$(this).html()+"=selected?"+$(this).attr('formatting'));
              formatting = '';
              insidehtml = $(this).html();
              if($(this).attr('formatting')){
                  formatting = $(this).attr('formatting');
                  formatlocation = 'left';
                  if($(this).attr('formatlocation')){
                      formatlocation = $(this).attr('formatlocation');
                  }
                  
                  if(formatlocation == 'left'){
                      insidehtml = formatting + $(this).html();
                  }else{
                      insidehtml = $(this).html() + formatting;
                  }
              }
              
              drclass = '';
              if(settings['dropdown']){
                  drclass = ' ui-dropdown';
              }
              
              if($(this).attr('selected')){
                  monthStr = '<div class="ui-clickable'+drclass+' selected " value="'+$(this).val()+'">'+insidehtml+'</div>';
              }else{
                  monthStr = '<div class="ui-clickable'+drclass+'" value="'+$(this).val()+'" style="display: none">'+insidehtml+'</div>';
              }
              
              $(this).parent().parent().append(monthStr);
          });
          
          // If dropdown is set to true, show dropdown option
          if(settings['dropdown']){
              this.parent().find('.ui-dropdown').click(function(){
                  //console.log(this);
                  hide = $(this).parent().parent().attr('option');
                  //console.log($(this).parent().parent());
                  if(hide == 'hidden'){
                      $(this).parent().find('.ui-dropdown').css('display', 'block');
                      $(this).parent().parent().attr('option', 'visible');
                      $(this).removeClass('selected');
                  }else{
                      $(this).parent().parent().attr('option', 'hidden');
                      $(this).parent().find('.ui-dropdown').css('display', 'none');
                      $(this).css('display', 'block');
                      $(this).addClass('selected');
                      
                      //change input value
                      $(this).parent().find('input').val($(this).attr('value'));
                  }
                  
              });
          }
          
          this.parent().parent().find('.mto-before').click(function(){
              selected = $(this).parent().find('.selected');
              if(selected.prev().hasClass('ui-clickable')){
                  selected.removeClass('selected');
                  selected.css('display', 'none');
                  prev = selected.prev();
                  prev.addClass('selected');
                  prev.css('display', 'block');
                  selected.parent().find('input').val(selected.prev().attr('value'));
              }
          });
          //console.log(this.parent());
          this.parent().parent().find('.mto-after').click(function(){
              selected = $(this).parent().find('.selected');
              if(selected.next().hasClass('ui-clickable')){
                  selected.removeClass('selected');
                  selected.css('display', 'none');
                  prev = selected.next();
                  prev.addClass('selected');
                  prev.css('display', 'block');
                  selected.parent().find('input').val(selected.next().attr('value'));
              }
          });
          
          this.parent().append('<input id="ui-mto-'+thisID+'" type="hidden" name="'+thisName+'" value="'+$('.ui-mto .selected').attr('value')+'"/>')
          this.parent().find('select').remove();
      };
})( jQuery );
