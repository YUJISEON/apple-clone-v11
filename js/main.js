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
                cancvas : document.querySelector('#video_canvas_0'),
                context  : document.querySelector('#video_canvas_0').getContext('2d'),
                videoImages : []
            },
            values: {
                videoImageCount: 300,
                imageSequence : [0, 299],
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
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
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

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
                pinC: document.querySelector('#scroll_section_2 .c .pin'),
                cancvas : document.querySelector('#video_canvas_1'),
                context  : document.querySelector('#video_canvas_1').getContext('2d'),
                videoImages : []
            },
            values: {
                videoImageCount: 960,
                imageSequence : [0, 959],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
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
                canvasCaption: document.querySelector('.canvas_caption'),
                cancvas : document.querySelector('.image-blend-canvas'),
                context : document.querySelector('.image-blend-canvas').getContext('2d'),
                imagesPath : [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
				images: []
            },
			values: {
                // 화면 크기에 따라 크기가 결정됨으로 미리 정할 수 없기 때문에 0으로 셋팅
				rect1X: [ 0, 0, { start: 0, end: 0 } ],
				rect2X: [ 0, 0, { start: 0, end: 0 } ],
				blendHeight: [ 0, 0, { start: 0, end: 0 } ],
				canvas_scale: [ 0, 0, { start: 0, end: 0 } ],
				canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
				canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
				rectStartY: 0
			}        
        }
    ];

    function setCanvasImages() {
        let imgElem;
        for(let i=0; i<sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            // 또는 document.createElement('img');
            imgElem.src = `./video/001/IMG_${6726+i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        console.log(sceneInfo[0].objs.videoImages);

        let imgElem2;
        for(let i=0; i<sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            // 또는 document.createElement('img');
            imgElem2.src = `./video/002/IMG_${7027+i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }
        console.log(sceneInfo[2].objs.videoImages);

        let imgElem3;
        for(let i=0; i<sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image();
            // 또는 document.createElement('img');
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
        console.log(sceneInfo[3].objs.images);
    }

    setCanvasImages();

    function checkMenu() {
        if(yOffset > 44) {
            document.body.classList.add('local_nav_sticky');
        } else {
            document.body.classList.remove('local_nav_sticky');
        }
    }

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

        const heightRatio = window.innerHeight / 1080;    
        sceneInfo[0].objs.cancvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.cancvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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

                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.cancvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset); 
                //console.log(sequence);

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
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                if (scrollRatio <= 0.5) {
                    objs.cancvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset); 
                } else {
                    objs.cancvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset); 
                }    

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

                // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
				if (scrollRatio > 0.9) {
					const objs = sceneInfo[3].objs;
					const values = sceneInfo[3].values;
					const widthRatio = window.innerWidth / objs.cancvas.width;
					const heightRatio = window.innerHeight / objs.cancvas.height;
					let canvasScaleRatio;

					if (widthRatio <= heightRatio) {
						// 캔버스보다 브라우저 창이 홀쭉한 경우
						canvasScaleRatio = heightRatio;
					} else {
						// 캔버스보다 브라우저 창이 납작한 경우
						canvasScaleRatio = widthRatio;
					}

					objs.cancvas.style.transform = `scale(${canvasScaleRatio})`;
					objs.context.fillStyle = 'white';
					objs.context.drawImage(objs.images[0], 0, 0);

					// 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
					const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
					const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

					const whiteRectWidth = recalculatedInnerWidth * 0.15;
					values.rect1X[0] = (objs.cancvas.width - recalculatedInnerWidth) / 2;
					values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
					values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
					values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

					// 좌우 흰색 박스 그리기
					objs.context.fillRect(
						parseInt(values.rect1X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.cancvas.height
					);
					objs.context.fillRect(
						parseInt(values.rect2X[0]),
						0,
						parseInt(whiteRectWidth),
						objs.cancvas.height
					);
				}

    
                break;
            case 3:
                let step = 0;
                //console.log('3play');
                // 가로*세로 모두 꽉 차게 하기 위해 셋팅 - 계산 필요
                // 원래 컨버스 크기 / 브라우저 폭
                // 원래 캔버스 크기 / 브라우저 높이
                const widthRatio = window.innerWidth / objs.cancvas.width;
				const heightRatio = window.innerHeight / objs.cancvas.height;
				let canvasScaleRatio;
                //console.log(widthRatio, heightRatio);

                // 비율에 따라서 캔버스를 얼마나 조절 할것인지 다르게 결정
                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                    console.log('heightRatio로 결정');
                } else {
                    // 캔버스보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                    console.log('widthRatio로 결정');
                }

                objs.cancvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
				objs.context.drawImage(objs.images[0], 0, 0);

                // 캔버스 사이즈에 맞춰 가정한 innerWidth, innerHeight
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
				const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                //console.log(recalculatedInnerWidth, recalculatedInnerHeight );

                // 화면상 위치와 크기를 가져오는 메소드 - getBoundingClientRect()
                //  >> 스크롤 속도에 따라서 변화함 (영향을 받음) - 정확도 떨어짐
                // >> offsetTop으로 대체 - 고정된 값 // scale 하기 전의 원래 크기 기준
                
                // 3번씬이 시작되는 위치 (padding-top 포함)
                if(!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    // values.rectStartY = objs.canvas.offsetTop ;
                    values.rectStartY = objs.cancvas.offsetTop + (objs.cancvas.height - objs.cancvas.height * canvasScaleRatio) / 2  ;
                    console.log(values.rectStartY);
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
					values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }
                
                const whiteRectWidth = recalculatedInnerWidth * 0.15;
                // 빨강 - 검정 >> 파랑*2 
				values.rect1X[0] = (objs.cancvas.width - recalculatedInnerWidth) / 2; // 출발
				values.rect1X[1] = values.rect1X[0] - whiteRectWidth;                 // 최종값
                // 검정 + 파랑 반쪽 
				values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
				values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

				// 좌우 흰색 박스 그리기
                // x, y, width, height
                objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currentYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.cancvas.height
                );
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currentYOffset)),
                    0,
                    parseInt(whiteRectWidth),
                    objs.cancvas.height
                );

        
                if (scrollRatio < values.rect1X[2].end) {
					step = 1;
					// console.log('캔버스가 브라우저 상단에 닿기 전');
					objs.cancvas.classList.remove('sticky');
				} else {
                    console.log("000000");
					step = 2;
					// console.log('캔버스가 브러우저 상단에 닿은 후');
					// 이미지 블렌드
					// values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
					values.blendHeight[0] = 0;
					values.blendHeight[1] = objs.cancvas.height;
					values.blendHeight[2].start = values.rect1X[2].end;
					values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
					const blendHeight = calcValues(values.blendHeight, currentYOffset);

                    // 소스 이미지에서 가져온거, 캔버스에 그리는 부분
					objs.context.drawImage(objs.images[1],
						0, objs.cancvas.height - blendHeight, objs.cancvas.width, blendHeight,
						0, objs.cancvas.height - blendHeight, objs.cancvas.width, blendHeight
					);

					objs.cancvas.classList.add('sticky');
					objs.cancvas.style.top = `${-(objs.cancvas.height - objs.cancvas.height * canvasScaleRatio) / 2}px`;

                    // 이미지 블렌드가 끝난 다음
					if (scrollRatio > values.blendHeight[2].end) {
                        console.log("111111");
						values.canvas_scale[0] = canvasScaleRatio;
						values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.cancvas.width);
						values.canvas_scale[2].start = values.blendHeight[2].end;
						values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

						objs.cancvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
						objs.cancvas.style.marginTop = 0;
					}


                    // 캔버스 스케일이 끝난 다음 + canvas_scale 값이 셋팅된 경우
					if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
                        console.log("22222");
						objs.cancvas.classList.remove('sticky');
						objs.cancvas.style.marginTop = `${scrollHeight * 0.4}px`;

						values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
						values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
						values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
						values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
						objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
						objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
					} else {
						objs.canvasCaption.style.opacity = values.canvasCaption_opacity[0];
					}
				}

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

    window.addEventListener('load', ()=>{
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
        sceneInfo[2].objs.context.drawImage(sceneInfo[2].objs.videoImages[0], 0, 0);
    });
    //=window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();        
        checkMenu();
    });
    


})();