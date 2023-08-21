/*
 - ����ȣ���� ���ø� ��Ģ ��ȯ ��ũ��Ʈ
 - ����ȣ���� ����� �� �ҽ��� �����ؾ� �մϴ�.
   (�ּ����� �����ؾ� �� ���� ǥ��)
*/
/*$(document).ready(function() {
 var originalURL = "/sr";  // ���ø� �ڵ带 ġȯ��ų �۾�����Ʈ ���丮
 var results = $("body").html().replace(/{{\$template}}/g, originalURL);
 $("body").html(results);
 // link �±� URLġȯ
 $("link[href*='{{$template}}']").each(function() {
  $(this).attr('href', $(this).attr('href').replace('{{$template}}', originalURL));
 });
 // script �±� URLġȯ
 $("script[src*='{{$template}}']").each(function() {
  $(this).attr('href', $(this).attr('href').replace('{{$template}}', originalURL));
 });*/
 // ��ũ URLġȯ
/* $("a[href*='{{$template}}']").each(function() {
  $(this).attr('href', $(this).attr('href').replace('{{$template}}', originalURL));
 });*/
 // �̹��� URLġȯ
/* $("img[src*='{{$template}}']").each(function() {
  $(this).attr('src', $(this).attr('src').replace('{{$template}}', originalURL));
 });*/
//});
// ī��24 ����ȣ���� ����� �ٷ� ������� ��ũ��Ʈ�� �����Ͻñ� �ٶ��ϴ�.

function isPC() {
 var $winWidth = $(window).width();
 if($winWidth > 1024) {
  return true;
 } else {
  return false;
 }
}

// URL �Ķ���� �ҷ�����
var getUrlParameter = function getUrlParameter(sParam) {
 var sPageURL = decodeURIComponent(window.location.search.substring(1)),
 sURLVariables = sPageURL.split('&'),
 sParameterName,
 i;
 for (i = 0; i < sURLVariables.length; i++) {
  sParameterName = sURLVariables[i].split('=');
  if (sParameterName[0] === sParam) {
   return sParameterName[1] === undefined ? true : sParameterName[1];
  }
 }
};
// ��� �� GNB ���� ���� ��ũ��Ʈ
$(function() {
 var $gnb = $(".btm");
 var $gnbTrigger = $("#gnbTrigger");
 var $logo = $("#logo");
 var mask = $(".mask");
 var allMenu = $("#all-menu");
 var mnuEasing = "easeInOutExpo";
 
 // GNB Ȱ��ȭ
 $("#nav > li").each(function() {
  var $currIndex = getUrlParameter('top') - 1;
  if($(this).index() == $currIndex) $(this).addClass('open');
 });
 // GNB ��Ȱ��ȭ
 function gnbdeActive() {
  $("#nav > li").removeClass('open');
  $("#nav > li > ul").removeAttr('style');
  $gnbTrigger.removeClass('open');
  $("body").removeClass('lock');
 }
 // GNB ���콺����
 $("#nav > li").mouseenter(function() {
  var $option = {
    'display':'block',
    'top':'86px',
    'opacity':'0'
   }
  if(isPC() === true) {
   if(!$(this).hasClass('on')) {
    $(this).addClass('on');
    if($(this).find('div.menu-item').length > 0) {
     $(this).find('div.menu-item').css($option);
     TweenMax.to($(this).find('div.menu-item'), 0.25, {'opacity':1, 'top':'86px'});
    }
   }
  }
 });
 // GNB ���콺�ƿ�
 $("#nav > li").mouseleave(function() {
  var $idx = $(this).index();
  var $option = {
    'display':'',
    'top':'',
    'opacity':''
   }
  if(isPC() === true) {
   $(this).removeClass('on');
   if($(this).find('div.menu-item').length > 0) {
    TweenMax.to($(this).find('div.menu-item'), 0.25, {'opacity':0, 'top':'86px', onComplete:function() {
     $("#nav > li").eq($idx).find('div.menu-item').css($option);
    }});
   }
  }
 });
 
 
 // GNB Ŭ��
 $("#nav > li > a").click(function(e) {
  if(isPC() === false) {
   if(!$(this).parent().hasClass('open')) {
    if($(this).next('div.menu-item').length > 0) {
     e.preventDefault();
     $("#nav > li div.menu-item").stop().slideUp(250);
     $("#nav > li").removeClass('open');
     $(this).parent().addClass('open');
     $(this).next('div.menu-item').stop().slideDown(350, 'easeInOutExpo');
    }
   } else {
    if($(this).next('div.menu-item').length > 0) {
     e.preventDefault();
     $(this).parent().removeClass('open');
     $(this).next('div.menu-item').stop().slideUp(250);
    }
   }
  }
 });
 // ����ϸ޴� ��۹�ư Ŭ��
 $gnbTrigger.click(function() {
  if(!TweenMax.isTweening($gnb)) {
   if(!$(this).hasClass('open')) {
    $(this).addClass('open');
    $("body").addClass('lock');
    mask.css({'opacity':'0.65', 'height':'100%'});
    TweenMax.to($gnb, 0.5, {right:'0px', ease:Expo.easeInOut, onComplete:function() {
    //$logo.stop().fadeIn(200);
    
    }});
   } else {
    $(this).removeClass('open');
    $("body").removeClass('lock');
    mask.css({'opacity':'0', 'height':'0'});
    TweenMax.to($gnb, 0.5, {right:'-100%', ease:Expo.easeInOut});
    //$logo.stop().fadeOut(100);
    
   }
  }
 });
 
 mask.click(function() {
        $("#gnbTrigger").removeClass('open');
  $("body").removeClass('lock');
  mask.css({'opacity':'0', 'height':'0'});
  TweenMax.to($gnb, 0.5, {right:'-300px', ease:Expo.easeInOut});
    });

 // ������ ������¡ ó��
 $(window).bind('resize', function() {
  var $winWidth = $(this).width();
  if($winWidth > 1024) {
   $logo.removeAttr('style');
   $gnb.removeAttr('style');
   gnbdeActive();
  } else {
   if(!$gnbTrigger.hasClass('open')) {
    $logo.removeAttr('style');
   }
  }
 });
 
 // ��ü�޴� ����
 function allMenuOpen() {
  if(!allMenu.hasClass('open')) {
   allMenu.addClass('open');
   allMenu.find('.menu-layer').removeAttr('style');
   allMenu.find('.menu-layer').css({top:'-100%', opacity:'0'});
   allMenu.fadeIn(400);
   allMenu.find('.menu-layer').stop().animate({top:'50%', opacity:'1'}, 800, mnuEasing);
   $("body").addClass('fixed');
  }
 }
 // ��ü�޴� �ݱ�
 function allMenuClose() {
  allMenu.removeClass('open');
  allMenu.find('.menu-layer').stop().animate({top:'-100%', opacity:'0'}, 600, mnuEasing);
  allMenu.fadeOut(1000);
  $("body").removeClass('fixed');
 }
 // ��ü�޴� ���� ��ư Ŭ��
 $("#header .btn-allmenu").click(function() {
  allMenuOpen();
 });
 // ��ü�޴� �ݱ� ��ư Ŭ��
 $("#all-menu .btnClose").click(function() {
  allMenuClose();
 });
 // ����ũ���� Ŭ���� ��ü�޴� �ݱ�
 $("#all-menu .mask_all").click(function() {
  allMenuClose();
 });
});

// �Խ��� ī�װ��� �� (2019-04-23 �߰�)
$(function() {
    
    // ī�װ��� ��ũ Ŭ����
    $(document).on('click', '.sub_tab > a', function() {
        
            if(!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).next('ul#tab_menu').css('display','block');
            } else {
                $(this).removeClass('open');
                $(this).next('ul#tab_menu').css('display','none');
            }
        
    });
 
 // ī�װ��� ��ũ Ŭ����
    $(document).on('click', '#bo_list .board_tab_spec > a', function() {
        
            if(!$(this).hasClass('open')) {
                $(this).addClass('open');
                $(this).next('ul.tab').css('display','block');
            } else {
                $(this).removeClass('open');
                $(this).next('ul.tab').css('display','none');
            }
        
    });
    
});

/* ----------------- �޴� ���� ��ũ��Ʈ ----------------- */
/*$(document).ready(function() {
 var subNavi = $("#subnav");
 var allMenu = $("#all-menu");
 var mnuEasing = "easeInOutExpo";
 
 if(isPC() === true) {
  // ���θ޴� ���콺 �÷��� �� ����޴� ǥ��
  $("#nav > li").mouseenter(function() {
   var mnuIndex = $(this).index();
 
   subNavi.find('.menu-item').removeClass('active');
   subNavi.find('.menu-item').eq(mnuIndex).addClass('active');
   if(!subNavi.hasClass('show')) subNavi.addClass('show');
  });
 
  // ������� ���콺 ���� �� ����޴� ��ü ����
  $("#header").mouseleave(function() {
   subNavi.removeClass('show');
  });
 }
 
 // ����ϸ޴� GNB Ŭ��
 $("#nav > li").click(function(e) {
  if(isPC() === false) {
   if(!$(this).parent().hasClass('open')) {
    subNavi.find('.menu-item').removeClass('active');
   subNavi.find('.menu-item').eq(mnuIndex).addClass('active');
   if(!subNavi.hasClass('show')) subNavi.addClass('show');
   } else {
    if($(this).next('ul').length > 0) {
     e.preventDefault();
     $(this).parent().removeClass('open');
     $(this).next('ul').stop().slideUp(250);
    }
   }
  }
 });
 
 // ��ü�޴� ����
 function allMenuOpen() {
  if(!allMenu.hasClass('open')) {
   allMenu.addClass('open');
   allMenu.find('.menu-layer').removeAttr('style');
   allMenu.find('.menu-layer').css({top:'-100%', opacity:'0'});
   allMenu.fadeIn(400);
   allMenu.find('.menu-layer').stop().animate({top:'50%', opacity:'1'}, 800, mnuEasing);
   $("body").addClass('fixed');
  }
 }
 // ��ü�޴� �ݱ�
 function allMenuClose() {
  allMenu.removeClass('open');
  allMenu.find('.menu-layer').stop().animate({top:'-100%', opacity:'0'}, 600, mnuEasing);
  allMenu.fadeOut(1000);
  $("body").removeClass('fixed');
 }
 // ��ü�޴� ���� ��ư Ŭ��
 $("#header .btn-allmenu").click(function() {
  allMenuOpen();
 });
 // ��ü�޴� �ݱ� ��ư Ŭ��
 $("#all-menu .btnClose").click(function() {
  allMenuClose();
 });
 // ����ũ���� Ŭ���� ��ü�޴� �ݱ�
 $("#all-menu .mask").click(function() {
  allMenuClose();
 });
});*/
/* ----------------- ��ũ�� ��� ���� ----------------- */
$(window).scroll(function() {
 if(isPC() === true) {
  var scroll_h = $(this).scrollTop();
  var hd_h = $("#header > .top").outerHeight();
 
 
  if(scroll_h > hd_h) {
   if(!$("body").hasClass('scroll')) $("body").addClass('scrollfix');
  } else {
   $("body").removeClass('scrollfix')
  }
 }
});
/* ----------------- �޴� �� �� Ȱ��ȭ ��ũ��Ʈ ----------------- */
$(document).ready(function() {
 var depth1 = getUrlParameter('top') - 1;
 var depth2 = getUrlParameter('sub') - 1;
 $("#nav > li").eq(depth1).addClass('on123');
 $(".menu-item").eq(depth1).find('ul').children().eq(depth2).addClass('on');
 $("#tab_menu[data-role=menu]").children().eq(depth2).addClass('active');
});
/* ----------------- ���������� ���� ��ũ��Ʈ ----------------- */
// ���� �Ѹ� ���־�
$(document).ready(function() {
 var elem = $("#mainVisual > .imgList");
 var count = elem.children().length;
 var visual_index = 0;
 var easeEffect = "easeInOutCubic";
 var timer;
 // �ڵ� �Ѹ� �ֱ� �ν� �� ����  
 if(!elem.data('interval')) {
  var interval = '3000';
 } else {
  var interval = elem.data('interval');
 }
 // ���������̼� ����
 function rollingInit() {
  var item = "<li></li>";
  for(i=0; i<count; i++) {
   $("#mainVisual > .pagination").append(item);
  }
  $("#mainVisual > .pagination > li:first").addClass('active');
 }
 // �����̵� ó��
 function slide(direction) {
  if(visual_index < 0) {
   visual_index = count - 1;
  } else if(visual_index >= count) {
   visual_index = 0;
  }
  // NEXT ����
  if(!direction || direction == 'next') {
   elem.children().eq(visual_index).css({left:'100%'});
   elem.children().eq(visual_index).stop().animate({left:0}, 600, easeEffect);
   // ���� �ε����� �������� ��� ������ ��� �������� �����̵�
   if(visual_index == 0) {
    elem.children().eq(-1).stop().animate({left:'-100%'}, 600, easeEffect);
   }
   // ���� �ε����� ��ġ���� �����鼭 ���� �ε������� ���� ��쿡�� �������� �����̵�
   elem.children().each(function() {
    if($(this).index() != visual_index && $(this).index() < visual_index) {
     $(this).stop().animate({left:'-100%'}, 600, easeEffect);
    }
   });
  // PREV ����
  } else if(direction == 'prev') {
   elem.children().eq(visual_index).css({left:'-100%'});
   elem.children().eq(visual_index).stop().animate({left:0}, 600, easeEffect);
   // ���� �ε����� �������� ��� ó�� ��� �������� �����̵�
   if(visual_index == count - 1) {
    elem.children().eq(0).stop().animate({left:'100%'}, 600, easeEffect);
   }
   elem.children().each(function() {
    if($(this).index() != visual_index) {
     $(this).stop().animate({left:'100%'}, 600, easeEffect);
    }
   });
  } else {
   console.log('�����̵� ������ �ùٸ��� ������ �ֽʽÿ�. (prev : ���� / next : ����)');
   return false;
  }
  $("#mainVisual > .pagination > li").removeClass('active');
  $("#mainVisual > .pagination > li").eq(visual_index).addClass('active');
 }
 // Ÿ�̸� ����
 function setTimer() {
  timer = setInterval(function() { visual_index++; slide('next'); }, interval);
 }
 // Ÿ�̸� ����
 function clearTimer() {
  elem.stop();
  clearInterval(timer);
 }
 // ������ư Ŭ��
 $("#mainVisual .prev").click(function() {
  if(!elem.children().is(':animated')) {
   clearTimer();
   visual_index--;
   slide('prev');
   setTimer();
  }
 });
 // ������ư Ŭ��
 $("#mainVisual .next").click(function() {
  if(!elem.children().is(':animated')) {
   clearTimer();
   visual_index++;
   slide('next');
   setTimer();
  }
 });
 // ���������̼� Ŭ��
 $(document).on('click', '#mainVisual > .pagination > li', function() {
  if(!elem.children().is(':animated')) {
   var page_index = $(this).index();
   if(page_index > visual_index) {  // Ŭ���� ���������̼� �ε����� ���� �ε������� Ŭ ��� next �������� �����̵�
    clearTimer();
    visual_index = page_index;
    slide('next')
    setTimer();
   } else if (page_index < visual_index) {  // Ŭ���� ���������̼� �ε����� ���� �ε������� ���� ��� prev �������� �����̵�
    clearTimer();
    visual_index = page_index;
    slide('prev');
    setTimer();
   } else {  // Ŭ���� ���������̼� �ε����� ���� �ε����� ������ �����̵� ���� ����
    return false;
   }
  }
 });
 setTimer();
 rollingInit();
});
// BEFORE&AFTER ���� �� ���
$(document).ready(function() {
 $("#section1 .tab-list > li").click(function() {
  var tab_index = $(this).index();
  $("#section1 .tab-list > li").removeClass('active');
  $(this).addClass('active');
  $("#rollingBox > .rolling-box").removeClass('active');
  $("#rollingBox > .rolling-box").eq(tab_index).addClass('active');
 });
});
// BEFORE&AFTER ���� �Ѹ�
$(document).ready(function() {
 var slide_index = [];
 var count = [];
 var elem;
 var item_size = $("#rollingBox .rolling-box > .imgList > li").width();
 var easeEffect = "easeInOutCubic";
 // �ε��� �迭 �ʱ�ȭ
 $("#rollingBox .rolling-box").each(function(i) {
  slide_index[i] = 0;
  count[i] = $(this).find('.imgList').children().length;
  i++;
 });
 // �����̵� ó��
 function slide(index) {
  elem = $("#rollingBox .rolling-box.active");
  if(slide_index[index] < 0) {
   slide_index[index] = count[index] - 1;
  } else if(slide_index[index] >= count[index]) {
   slide_index[index] = 0;
  }
  elem.find('.imgList').stop().animate({'left':-(item_size*slide_index[index]) + 'px'}, 400, easeEffect);
 }
 // ���� ��ư Ŭ��
 $("#section1 .control-box .prev").click(function() {
  elem = $("#rollingBox .rolling-box.active > .imgList");
  var active_index = elem.index();
  if(!elem.is(':animated')) {
   slide_index[active_index]--;
   slide(active_index);
  }
 });
 // ���� ��ư Ŭ��
 $("#section1 .control-box .next").click(function() {
  elem = $("#rollingBox .rolling-box.active > .imgList");
  var active_index = elem.index();
  if(!elem.is(':animated')) {
   slide_index[active_index]++;
   slide(active_index);
  }
 });
});
// 3�� �׸��� �Ѹ� ����
$(document).ready(function() {
 var grid_index = 0;
 var elem = $("#grid-rolling > .slide-wrapper > .imgList");
 var count = elem.children().length;
 var item_size = elem.children().width();
 var easeEffect = "easeInOutQuint";
 // �׸��� �Ѹ� �ʱ�ȭ
 function gridInit() {
  elem.css('width', item_size*count + 'px');
 }
 // �����̵� ó��
 function slide() {
  if(grid_index < 0) {
   grid_index = count - 3;
  } else if(grid_index > count - 3) {
   grid_index = 0;
  }
  elem.stop().animate({left:-grid_index*item_size + 'px'}, 600, easeEffect);
 }
 // ���� ��ư Ŭ��
 $("#grid-rolling .control-btn .prev").click(function() {
  if(!elem.is(':animated')) {
   grid_index--;
   slide();
  }
 });
 // ���� ��ư Ŭ��
 $("#grid-rolling .control-btn .next").click(function() {
  if(!elem.is(':animated')) {
   grid_index++;
   slide();
  }
 });
});
/* ----------------- ���������� ���� ��ũ��Ʈ ----------------- */
// ���޴� ���� ��ũ��Ʈ
$(document).ready(function() {
 var easeEffect = "easeInOutExpo";
 var btn_pos = parseInt($("#quickmenu").css('right'));
 var layer_pos = $("#quickmenu .quick-layer").outerWidth();
 $("#quickmenu .iconlist > li").click(function() {
  var match = $(this).data('match');
  $("#quickmenu .iconlist > li").removeClass('on');
  $(this).addClass('on');
  if(!$("#quickmenu").hasClass('open')) {
   $("#quickmenu").addClass('open');
   $("#quickmenu .quick-layer[data-icon=" + match + "]").css('display','block');
   $("#quickmenu .quick-layer[data-icon=" + match + "]").stop().animate({right:0}, 600, easeEffect);
   $("#quickmenu").stop().animate({right:layer_pos + 'px'}, 600, easeEffect);
  } else {
   $("#quickmenu .quick-layer").css('display','none');
   $("#quickmenu .quick-layer[data-icon=" + match + "]").css({'display':'block', 'right':0});
  }
 });
 $("#quickmenu .quick-layer .btn-close").click(function() {
  $("#quickmenu").removeClass('open');
  $("#quickmenu .iconlist > li").removeClass('on');
  $("#quickmenu .quick-layer").stop().animate({right:-layer_pos}, 600, easeEffect);
  $("#quickmenu").stop().animate({'right':btn_pos}, 600, easeEffect);
 });
});
// �ѷ����� ��ũ��Ʈ
$(document).ready(function() {
 var old_images = [];
 // ���� ������ �� �� ���� ������� ������ ����
 $("#facilitySlider .big-thumb .thumb-list > li").each(function(i) {
  old_images[i] = $(this).find('img').attr('src');
  i++;
 });
 // 1�ܰ� : ���� �� Ŭ���� �������� �� ������ ��ü & �� ���� ��ǥ �̹����� �ʱ�ȭ
 $("#facilitySlider .big-thumb .floor-tab > li").click(function() {
  var tab_index = $(this).index();
  $("#facilitySlider .big-thumb .floor-tab > li").removeClass('active');
  $(this).addClass('active');
  $("#facilitySlider .big-thumb .thumb-list > li").removeClass('active');
  $("#facilitySlider .big-thumb .thumb-list > li").eq(tab_index).find('img').attr('src', old_images[tab_index]);
  $("#facilitySlider .big-thumb .thumb-list > li").eq(tab_index).addClass('active');
  $("#facilitySlider .floor-container > .floor-info .thumb-list > li").removeClass('selected');
  $("#facilitySlider .floor-container > .floor-info").removeClass('active');
  $("#facilitySlider .floor-container > .floor-info").eq(tab_index).addClass('active');
 });
 // 2�ܰ� : �� ���� ���� ����� Ŭ���� ���� ����� ��ü
 $("#facilitySlider .floor-container > .floor-info .thumb-list > li").click(function() {
  var thumb_img = $(this).find('img').attr('src');
  $("#facilitySlider .floor-container > .floor-info .thumb-list > li").removeClass('selected');
  $(this).addClass('selected');
  $("#facilitySlider .big-thumb .thumb-list > li.active").find('img').attr('src', thumb_img);
 });
});
$(function() {
 $(".faq-list > li > .question").click(function() {
  if(!$(this).parent().hasClass('open')) {
   $(".faq-list > li").removeClass('open');
   $(".faq-list > li > .answer").stop().slideUp(300);
   $(this).parent().addClass('open');
   $(this).siblings('.answer').stop().slideDown(300);
  } else {
   $(this).parent().removeClass('open');
   $(this).siblings('.answer').stop().slideUp(300);
  }
 });
});

function gnbController(mainClass, subClass, thirdClass){
 var mainChk = $("#nav>li>a"); // 1st for ������ length �� üũ�� �׸� ����.
 var mainChk2 = $("#tab_menu>li>a");
 var mainChk3 = $("#tab_menu_se>li>a");
  for(var i = 0; i < mainChk.length ; i++){
  var subChk = $("#nav>li").eq(i); //���� i �� ���� ��з� li�� �޶�����
   if(subChk.find("a").eq(0).text() == mainClass) { //üũ�� �׸� "��������" �� �����ϸ� ������ �Ǵ�
   //subChk.eq(0).addClass("selected");
   subChk.find("a").eq(0).addClass("selected");
   subChk.find(".menu-item").eq(0).show();
   $("#header_wrap_bg").stop().animate({left:"120px"},'fast',"easeOutQuart");
    for (var z = 0; z < subChk.find("li>a").length; z++){ // ��з�i�� ��ġ�� ���� �Һз� length
     if(subChk.find("li>a").eq(z).text() == subClass){
      subChk.find("li>a").eq(z).addClass("selected");
     } else {
      subChk.find("li>a").eq(z).removeClass("selected");
     }
    }; 
   } else {
    subChk.find("a").eq(0).removeClass("selected");
   }
  };
 
  for(var i = 0; i < mainChk2.length ; i++){
  var subChk2 = $("#tab_menu>li").eq(i); //���� i �� ���� ��з� li�� �޶�����
   if(subChk2.find("a").eq(0).text() == subClass) { //üũ�� �׸� "��������" �� �����ϸ� ������ �Ǵ�
   //subChk.eq(0).addClass("selected");
   subChk2.find("a").eq(0).addClass("selected");
   subChk2.find(".menu-item").eq(0).show();
   
    for (var z = 0; z < subChk2.find("li>a").length; z++){ // ��з�i�� ��ġ�� ���� �Һз� length
     if(subChk2.find("li>a").eq(z).text() == subClass){
      subChk2.find("li>a").eq(z).addClass("selected");
     } else {
      subChk2.find("li>a").eq(z).removeClass("selected");
     }
    }; 
   } else {
    subChk2.find("a").eq(0).removeClass("selected");
   }
  };
  
  for(var i = 0; i < mainChk3.length ; i++){
  var subChk3 = $("#tab_menu_se>li").eq(i); //���� i �� ���� ��з� li�� �޶�����
   if(subChk3.find("a").eq(0).text() == thirdClass) { //üũ�� �׸� "��������" �� �����ϸ� ������ �Ǵ�
   subChk3.find("a").eq(0).addClass("selected");
   subChk3.find(".menu-item").eq(0).show();
   
    for (var z = 0; z < subChk3.find("li>a").length; z++){ // ��з�i�� ��ġ�� ���� �Һз� length
     if(subChk3.find("li>a").eq(z).text() == subClass){
      subChk3.find("li>a").eq(z).addClass("selected");
     } else {
      subChk3.find("li>a").eq(z).removeClass("selected");
     }
    }; 
   } else {
    subChk3.find("a").eq(0).removeClass("selected");
   }
  };
 };
 $(function() {
 var winW = $(window).width();
});

/* ----------------- �Խ��� ���� ��ũ��Ʈ ----------------- */ 
// �̹��� ��ư �ؽ�Ʈ�� ��ü 
$(document).ready(function() { 
// ������ ���� ��ư replace 
function admBtnReplace() { 
var $url = window.location.href; 
var $readpage = $url.indexOf('read_form'); 
$("#sub_container .sub_inner img").each(function() { 
var $src = $(this).attr('src'); 
// ���� 
if ($src.indexOf('btn_sdel.gif') > -1 && $readpage < 0) { 
var $opt = $(this).attr('onclick'); 
var $link = "<a href='javascript:;' class='btn btn-default' onclick='" + $opt + "'>����</a>"; 
$(this).before($link); 
$(this).remove(); 
} 
// �̵� 
if ($src.indexOf('move.gif') > -1 && $readpage < 0) { 
var $opt = $(this).attr('onclick'); 
var $link = "<a href='javascript:;' class='btn btn-default' onclick='" + $opt + "'>�̵�</a>"; 
$(this).before($link); 
$(this).remove(); 
} 
// ���� 
if ($src.indexOf('copy.gif') > -1 && $readpage < 0) { 
var $opt = $(this).attr('onclick'); 
var $link = "<a href='javascript:;' class='btn btn-default' onclick='" + $opt + "'>����</a>"; 
$(this).before($link); 
$(this).remove(); 
} 
// �̵� (��������) 
if ($src.indexOf('move.gif') > -1 && $readpage > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('�̵�'); 
$(this).remove(); 
} 
// ���� (��������) 
if ($src.indexOf('copy.gif') > -1 && $readpage > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('����'); 
$(this).remove(); 
} 
// ���� (��������) 
if ($src.indexOf('modify.gif') > -1 && $readpage > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('����'); 
$(this).remove(); 
} 
// ���� (��������) 
if ($src.indexOf('delete.gif') > -1 && $readpage > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('����'); 
$(this).remove(); 
} 
// ��� (��������) 
if ($src.indexOf('reply.gif') > -1 && $readpage > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('��۾���'); 
$(this).remove(); 
} 
}); 
} 
// �Ϲ� ��ɹ�ư replace 
function btnReplace() { 
$("#sub_container .sub_inner img").each(function() { 
var $src = $(this).attr('src'); 
// �۾��� 
if ($src.indexOf('write.gif') > -1) { 
$(this).parent('a').addClass('btn btn-primary'); 
$(this).parent('a').html('<i class="fa fa-pencil"></i>�۾���'); 
$(this).remove(); 
} 
// ���� 
if ($src.indexOf('prev.gif') > -1) { 
$(this).parent('a').addClass('btn btn-default'); 
$(this).parent('a').html('<i class="fa fa-angle-left"></i>����'); 
$(this).remove(); 
} 
// ��Ϻ��� 
if ($src.indexOf('list.gif') > -1) { 
$(this).parent('a').addClass('btn btn-secondary'); 
$(this).parent('a').html('<i class="fa fa-list-ul"></i>���'); 
$(this).remove(); 
} 
// ���� 
if ($src.indexOf('next.gif') > -1) { 
$(this).parent('a').addClass('btn btn-default right-icon'); 
$(this).parent('a').html('����<i class="fa fa-angle-right"></i>'); 
$(this).remove(); 
} 
// ���ԽŰ� 
if ($src.indexOf('spam.gif') > -1) { 
var $opt = $(this).attr('onclick'); 
var $link = '<a href="javascript:;" class="btn btn-secondary" onclick="' + $opt + '"><i class="fa fa-exclamation-triangle"></i>���ԽŰ�</a>'; 
$(this).before($link); 
$(this).remove(); 
} 
// �� �ۼ�/����/�亯 ��� 
if ($src.indexOf('cancel.gif') > -1) { 
$(this).parent('a').attr('href', 'javascript:history.go(-1);'); 
$(this).parent('a').addClass('btn btn-secondary'); 
$(this).parent('a').html('���'); 
$(this).remove(); 
} 
}); 
// �˻� 
$("#ext_search input[type=image]").before('<input type="submit" class="btn btn-default" value="�˻�" />'); 
$("#ext_search input[type=image]").css('display', 'none'); 
$(document).on('click', '#ext_search input[type=submit]', function() { 
$("#ext_search input[type=image]").trigger('click'); 
}); 
// �� �ۼ�/����/�亯 
$(".bbsnewf5 input[src*='confirm.gif']").before('<input type="submit" class="btn btn-primary btn-confirm" value="�ۼ��ϱ�" />'); 
$(".bbsnewf5 input[src*='confirm.gif']").css('display', 'none'); 
$(document).on('click', '.bbsnewf5 .btn-confirm', function() { 
$(".bbsnewf5 input[src*='confirm.gif']").trigger('click'); 
}); 
} 
// ȸ�� ���� ��ư replace 
function memBtnReplace() { 
$("#container .innerContainer img").each(function() { 
var $src = $(this).attr('src'); 
// ���̵� �ߺ�Ȯ�� 
if ($src.indexOf('btn_iddupl.gif') > -1) { 
var $opt = $(this).parent().attr('href'); 
var $link = '<a href="' + $opt + '" class="btn btn-default" style="margin-right:10px">���̵� �ߺ�Ȯ��</a>'; 
$(this).parent().before($link); 
$(this).parent().remove(); 
} 
}); 
} 
admBtnReplace(); 
btnReplace(); 
memBtnReplace(); 
});


// �Խ��� ī�װ��� �ڵ� ���� 
$(document).ready(function() { 
var cate_link = [], 
cate_title = [], 
currentURL = $(location).attr('pathname'), 
param = "?&com_board_category_code=", 
currentParam = "", 
insertHTML = "", 
idx = 0; 
if ($("select[name='com_board_category_code']").length > 0) { 
currentParam = getUrlParameter('com_board_category_code'); 
$("select[name='com_board_category_code'] > option").each(function() { 
cate_link[idx] = $(this).val(); 
cate_title[idx] = $(this).text(); 
idx++; 
}); 
insertHTML = '<div class="board_tab">'; 
insertHTML += '<ul>'; 
for (i = 0; i < idx; i++) { 
insertHTML += '<li data-category="' + cate_link[i] + '"><a href="' + currentURL + param + cate_link[i] + '">' + cate_title[i] + '</a></li>'; 
} 
insertHTML += '</ul>'; 
insertHTML += '</div>'; 
$(".brd_category").before(insertHTML); 
$.each(cate_link, function(m, key) { 
if (key == currentParam) { 
$(".board_tab > a").text(cate_title[m]); 
$(".board_tab > ul > li[data-category='" + key + "']").addClass('on'); 
} 
}); 
if (!currentParam) { 
$(".board_tab > ul > li:first").addClass('on'); 
} 
}
});