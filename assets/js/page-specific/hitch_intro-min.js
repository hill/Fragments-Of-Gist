var playing=!1,hitchcock=new Howl({src:["../assets/sounds/Hitchcock_presents.mp3"],volume:.4,onplay:function(){playing=!0},onend:function(){console.log("Finished hitchcock!"),playing=!1}});new ScrollMagic.Scene({triggerElement:".trigger-ambient"}).on("enter",function(){console.log("PLAYED HITCHCOCK THEME"),0==playing&&hitchcock.play()}).addTo(controller);