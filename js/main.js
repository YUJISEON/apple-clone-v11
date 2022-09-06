(function(){

    let yOffset = 0; // window.pageYOffset 값 담을 변수
    let prevScrollHeihgt = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; // 현재 활성화된 씬
    let enterNewScene = false; // 새로운 씬이 시작되는 순간 true

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
                messageA_opacity_in : [0, 1, { start : 0.1, end : 0.2}],
                messageA_translateY_in : [20, 0, { start : 0.1, end : 0.2}],
                //messageB_opacity_in : [0, 1, { start : 0.3, end : 0.4}],
                messageA_opacity_out : [1, 0, { start : 0.25, end : 0.3}],
                messageA_translateY_out : [0, 20, { start : 0.25, end : 0.3}],
                //messageC_opacity_in : [0, 1, { start : 0.5, end : 0.6}],
                //messageD_opacity_in : [0, 1, { start : 0.7, end : 0.8}],
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
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3) { // 또는 values[3]
            // start ~ end 사이에 애니메이션 실행
            const partScrollSatrt = values[2].start * scrollHeight;
            const prrtScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = prrtScrollEnd - partScrollSatrt;

            if( currentYOffset >= partScrollSatrt && currentYOffset <= prrtScrollEnd ) {
                rv = (currentYOffset - partScrollSatrt) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if ( currentYOffset < partScrollSatrt ) {
                rv = values[0];
            } else if ( currentYOffset > prrtScrollEnd) {
                rv = values[1];
            }
        } else {    
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeihgt;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        //console.log(currentScene, currentYOffset);

        switch( currentScene) {
            case 0: 
                //console.log('0play');
                //console.log(calcValues(values.messageA_opacity, currentYOffset)); 
                let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
                let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
                let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
                
                if( scrollRatio <= 0.22 ) {
                    objs.messageA.style.opacity = messageA_opacity_in; 
                    objs.messageA.style.transform = `translasteY(${messageA_translateY_in}%)`      
                    console.log("in " + messageA_opacity_in + ' / ' + messageA_translateY_in);
                } else {
                    objs.messageA.style.opacity = messageA_opacity_out;
                    objs.messageA.style.transform = `translasteY(${messageA_translateY_out}%)`    
                    console.log("out " + messageA_opacity_out + ' / ' + messageA_translateY_out);
                }                
                
                
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
        enterNewScene = false;
        prevScrollHeihgt = 0;
        for(let i=0; i<currentScene;i++) {
            prevScrollHeihgt += sceneInfo[i].scrollHeight;
        }
        //console.log(prevScrollHeihgt);

        if (yOffset > prevScrollHeihgt+sceneInfo[currentScene].scrollHeight) {            
            currentScene++;
            enterNewScene = true;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }

        if (yOffset < prevScrollHeihgt) {
            if(currentScene == 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            enterNewScene = true;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }        

        //console.log(currentScene);

        if(enterNewScene) return;
        playAnimation();
    }

    window.addEventListener('load', setLayout);
    //=window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    


})();