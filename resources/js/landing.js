var SCREEN_WIDTH, SCREEN_HEIGHT;
var TOTAL_CLOUDS = 50;
var DEPTH = 400;
var windowHalfX, windowHalfY;
var container, particle;
var camera, scene, renderer;
var scrollXOffset, scrollYOffset;
var btnOn, btnOff;
var mouseX = 0;
var mouseY = 0;

function supports_canvas() {
    return !!document.getElementById("canvas").getContext;
}

function windowResize() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = 550;
    windowHalfX = SCREEN_WIDTH / 2;
    windowHalfY = SCREEN_HEIGHT / 2;
    if(renderer!=null) renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    if(!isPhone()){
        if(SCREEN_WIDTH>=770) {
            $("#nav-container").css({"margin-left":SCREEN_WIDTH-350});
            $("#footer_utilities").css({"margin-left":SCREEN_WIDTH-368});
        } else {
            $("#nav-container").css({"margin-left":420});
            $("#footer_utilities").css({"margin-left":420});
        }
    }
    
}

function init() {
    btnOn = new Image(128,41); 
    btnOn.src="resources/img/landing/purchase_btn_on.png";
    btnOff = new Image(128,41); 
    btnOff.src="resources/img/landing/purchase_btn_off.png";
    windowResize();
    
    //if(supports_canvas()){
        /*
        camera = new THREE.Camera( 100, 1.8, 0.0001, 10000 );
        camera.position.y = 0;
        camera.position.z = 300;

        scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        var vx, vy, vz;
        var ratio, bitmap;
        for (var i = 0; i < TOTAL_CLOUDS; i++) {
            addCloud(
                -3000 + (Math.random()*16000), 
                -((i*40)*0.5 - (Math.random()*(i*40))), 
                -i*10
            );
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);

        scrollXOffset = window.pageXOffset;
        scrollYOffset = window.pageYOffset;
        
    
        //$(window).scroll(handleScroll);
        handleScroll();
        setInterval(loop, 1000/60);
        */
    //}
    
    handleScroll();
    setInterval(loop, 1000/60);
    setInterval(handleAnimations, 3000);
    
    setInterval(handleFade, 3000);
}

var fadePosition = 0;
var rackPosition = 0;
var rackOpacity = 0;
var contentPosition = 0;
var fadeScreen = 0;
function handleAnimations(){
    if(fadePosition == 0) {
         fadePosition = -347;
         rackPosition = -31;
        rackOpacity = 0.5;
        contentPosition = 40;
    } else {
        fadePosition = 0; 
        rackPosition = -102;
         rackOpacity = 1;
        contentPosition = -31;
    }
    
    $("#scrollImages").css("left",fadePosition+"px");
    $("#rackBar").css("top",rackPosition+"px");
    $("#rackContent").css("opacity",rackOpacity);
    $("#rackContent").css("top",contentPosition+"px");
}

function handleFade() {
    var $active = $('#fadeImages img.active');
    
    if ($active.length == 0) $active = $('#fadeImages img:last');

    var $next =  $active.next().length ? $active.next()
        : $('#fadeImages img:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

function over(){
    document.purchase_btn.src = btnOn.src;
}

function out(){
    document.purchase_btn.src = btnOff.src;
}

function addCloud(cx, cy, cz){
/*  if(cz <= -(SCREEN_HEIGHT/3)*2) {
        bitmap = document.images[2];
    } else if(cz <= -(SCREEN_HEIGHT/3)) {
        bitmap = document.images[1];
    } else {
        bitmap = document.images[0]; 
    } */
    
    bitmap = document.images[0]; 
    
    //var material = new THREE.ColorFillMaterial( 0xffffff, 1-Math.abs(cz/(TOTAL_CLOUDS*10)) )
    var material = new THREE.ParticleBitmapMaterial( bitmap );
    particle = new THREE.Particle( material );
    //particle.size = 70;
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;
    particle.scale.x = particle.scale.y = Math.random() * 10 + 5;
    scene.add(particle);
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

var q=0;
function loop() {
    /*
    q = TOTAL_CLOUDS;
    while(q--){
        if(scene.objects[q].position.x > 13000) 
            scene.objects[q].position.x = -3000;
        else
            scene.objects[q].position.x += 0.5;
    }
    */
    //camera.position.y += (-mouseY - camera.position.y) * .05;
    handleScroll();
    //renderer.render(scene, camera);
}



function easeInOutQuad (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
}

var scrollTween;
var wArray = [750, 1200, 750, 750, 750, 750, 750, 750, 750];
function handleBtn(v) {
    var dest=0;
    
    for(var i=0; i<v; i++) {
        dest += wArray[i];
    }
//  window.scroll(dest, scrollYOffset);
    
    scrollTween = new Tween(new Object(), 'xyz', Tween.regularEaseOut, scrollXOffset, dest, 0.5);
    scrollTween.onMotionChanged = function(event){
        window.scrollTo(event.target._pos, scrollYOffset);
        //$(window).scrollLeft(event.target._pos);
        scrollXOffset = window.pageXOffset;
        //camera.position.x = scrollXOffset;
        
        //if(detectIpad()) $("#header").css({"margin-left":scrollXOffset});
    };
    
    scrollTween.onMotionFinished = function(event){
        
        if(detectIpad()) $("#header").css({"margin-left":scrollXOffset});
    };
    
    scrollTween.start();
    
}

var top, left;

function handleScroll() {
    wt = window.pageYOffset;
    wl = window.pageXOffset;
    
    if(wt != scrollYOffset){
        scrollYOffset = wt;
        if(!detectIpad()) {
            $("#header").css({"margin-top":-wt});
            $("#footer_utilities").css({"margin-top":-wt+820});
        }
        $("#bg-container").css({"margin-top":-wt+80});
    } 
    
    if(wl != scrollXOffset) {
        scrollXOffset = wl;
        if(detectIpad()){
             $("#header").css({"margin-left":wl});
            //$("#footer_utilities").css({"margin-left":wl});
        }
        //$("#bg-container").css({"margin-left":wl});
        //camera.position.x = scrollXOffset;
    }
    

    
    
    //camera.tweenXto($(window).scrollLeft()-camera.position.x, 120);
    //console.log($(window).scrollLeft());
}// JavaScript Document