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
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }     
        },
        {
            type: "normal",
            heightNum: 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll_section_1'),
                content: document.querySelector('#scroll_section_1 .description')
            }            
        },
        {
            type: "sticky",
            heightNum: 5, 
            scrollHeight: 0, 
            objs: {
                container: document.querySelector('#scroll_section_2'),
                messageA: document.querySelector('#scroll_section_2 .a'),
                messageB: document.querySelector('#scroll_section_2 .b'),
                messageC: document.querySelector('#scroll_section_2 .c'),
                pinB: document.querySelector('#scroll_section_2 .b .pin'),
                pinC: document.querySelector('#scroll_section_2 .c .pin')
            },
            values: {
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            }           
        },
        {
            type: "sticky",
            heightNum: 5, 
            scrollHeight: 0,   
            objs : {
                container : document.querySelector('#scroll_section_3'),
                canvasCaption: document.querySelector('.canvas_caption')
            },
            values: {
    
            }         
        }
    ]

    function setLayout() {
        // 스크롤 섹션의 높이 셋팅
        for (let i=0; i< sceneInfo.length ; i++) {
            if(sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if(sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;                
            }
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
            const partScrollSatrt = values[2].start * scrollHeight;   // 0.1*4000 >> 400
            const prrtScrollEnd = values[2].end * scrollHeight;       // 0.2*4000 >> 800
            const partScrollHeight = prrtScrollEnd - partScrollSatrt; // 800-400 >> 400

            if( currentYOffset >= partScrollSatrt && currentYOffset <= prrtScrollEnd ) {
                // currentYOffset 현재 스크롤한 위치 - partScrollSatrt 애니메이션 스크롤 시작 위치 >> 시작 위치로부터 움직인 범위
                // 시작 위치로부터 스크롤된 범위 / partScrollHeight 현재 애니메이션의 범위 >> 범위 안에서의 스크롤 비율
                // values[1] 종료 - values[0] 시작 + values[0] 시작 >> 실제 시작되는 위치
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
        // currentYOffset 현재 씬의 스크롤 위치 / scrollHeight 현재 씬의 스크롤 범위 >> 스크롤 비율
        const scrollRatio = currentYOffset / scrollHeight; 
        //console.log(currentScene, currentYOffset);

        switch( currentScene) {
            case 0: 
                //console.log('0play');
                //console.log(calcValues(values.messageA_opacity, currentYOffset)); 
                //let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
                //let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
                //let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                //let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
                //연산을 줄이기 위해서 변수화 미진행

                if( scrollRatio <= 0.22 ) {
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset); 
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;   
                    //console.log("in " + messageA_opacity_in + ' / ' + messageA_translateY_in);
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;    
                    //console.log("out " + messageA_opacity_out + ' / ' + messageA_translateY_out);
                }    
                
                if (scrollRatio <= 0.42) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
    
                break;
            case 2:
                //console.log('2play');
                if (scrollRatio <= 0.25) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.57) {
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.83) {
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
    
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