(function(){

    let yOffset = 0; // window.pageYOffset 값 담을 변수
    let prevScrollHeihgt = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; // 현재 활성화된 씬

    const sceneInfo = [
        {
            type: "sticky",
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,       
            objs : {
                container : document.querySelector('#scroll_section_0'),
                messageA : document.querySelector('#scroll_section_0 .main_messge.a'),
                messageB : document.querySelector('#scroll_section_0 .main_messge.b'),
                messageC : document.querySelector('#scroll_section_0 .main_messge.c'),
                messageD : document.querySelector('#scroll_section_0 .main_messge.d'),
            },
            values: {
                messageA_opacity : [0, 1],
            }     
        },
        {
            type: "normal",
            heightNum: 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll_section_1')
            }            
        },
        {
            type: "sticky",
            heightNum: 5, 
            scrollHeight: 0, 
            objs : {
                container : document.querySelector('#scroll_section_2')
            }           
        },
        {
            type: "sticky",
            heightNum: 5, 
            scrollHeight: 0,   
            objs : {
                container : document.querySelector('#scroll_section_3')
            }         
        }
    ]

    function setLayout() {
        // 스크롤 섹션의 높이 셋팅
        for (let i=0; i< sceneInfo.length ; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        //console.log(sceneInfo);

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}

        document.body.setAttribute('id', `show_scene_${currentScene}`);
    }

    function calcValues(values, currentYOffset) {   

    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeihgt;
        console.log(currentScene, currentYOffset);

        switch( currentScene) {
            case 0: 
                //console.log('0play');
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];
                //console.log(messageA_opacity_0, messageA_opacity_1);
                
                calcValues(messageA_opacity_0, currentYOffset);
                break;
            case 1:
                //console.log('1play');
                break;
            case 2:
                //console.log('2play');
                break;
            case 3:
                //console.log('3play');
                break;
        }
    }

    function scrollLoop() {
        prevScrollHeihgt = 0;
        for(let i=0; i<currentScene;i++) {
            prevScrollHeihgt += sceneInfo[i].scrollHeight;
        }
        //console.log(prevScrollHeihgt);

        if (yOffset > prevScrollHeihgt+sceneInfo[currentScene].scrollHeight) {            
            currentScene++;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }

        if (yOffset < prevScrollHeihgt) {
            if(currentScene == 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }        

        //console.log(currentScene);

        playAnimation();
    }

    window.addEventListener('load', setLayout);
    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    


})();