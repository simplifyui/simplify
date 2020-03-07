//carousell1
const track =document.querySelector('.s-carousel-track');
if(document.contains(track)){
    const carouselSlide=Array.from(track.children) || undefined;
    const prevBtn =document.querySelector('.left');
    const nextBtn =document.querySelector('.right');
    const dotBtns =document.querySelector('.s-carousel-nav');
    const slideWidth =carouselSlide[0].getBoundingClientRect().width;

    const arrayLength=carouselSlide.length;
    for(let j=0; j<=arrayLength-2; j++){
        let dotbtn='';
         dotbtn=`
        <button class="s-carousel-indicator"></button>
        `;
        dotBtns.innerHTML +=dotbtn;
    }
    const dotArray=Array.from(dotBtns.children);
    //set slide position
    carouselSlide.forEach((slide, i)=> {
        slide.style.left= slideWidth * i +'px';
    });
    let i=0;
    
    const buttonDisplay=(targetIndex)=>{
        if(targetIndex === 0){
            prevBtn.classList.add('s-hidden');
            nextBtn.classList.remove('s-hidden');
        }
        else if(targetIndex == carouselSlide.length -1){
         nextBtn.classList.add('s-hidden');
         prevBtn.classList.remove('s-hidden');
        }
     
        else{
         nextBtn.classList.remove('s-hidden');
         prevBtn.classList.remove('s-hidden');
        }
     
    }
    const moveSlide =(currentSlide, targrtSlide)=>{
        track.style.transform ='translateX( -'+ targrtSlide.style.left + ')';
        currentSlide.classList.remove('s-current-slide');
        targrtSlide.classList.add('s-current-slide');
        const currDot = dotBtns.querySelector('.s-current-btn');
    }
    nextBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const currentSlide=track.querySelector('.s-current-slide');
        const nextSlide =currentSlide.nextElementSibling;
        const currDot = dotBtns.querySelector('.s-current-btn');
        const nextvdot=currDot.nextElementSibling;
        const targetIndex=carouselSlide.findIndex(slide=> slide === nextSlide);
        moveSlide(currentSlide,nextSlide);
        updateDot(currDot, nextvdot);
    
        buttonDisplay(targetIndex);
        
    });
    
    prevBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const currentSlide=track.querySelector('.s-current-slide');
        const prevSlide =currentSlide.previousElementSibling;
        const currDot = dotBtns.querySelector('.s-current-btn');
        const prevdot=currDot.previousElementSibling;
        const targetIndex = carouselSlide.findIndex(slide => slide === prevSlide);
        moveSlide(currentSlide,prevSlide);
        updateDot(currDot, prevdot);
        buttonDisplay(targetIndex);
        
    });
    
    const updateDot= (currDot, targetDot)=>{
        currDot.classList.remove('s-current-btn');
        targetDot.classList.add('s-current-btn');
    }
    
    dotBtns.addEventListener('click', e=>{
        const targetDot= e.target.closest('button');
        if(!targetDot) return;
        const currentSlide= track.querySelector('.s-current-slide');
        const currDot = dotBtns.querySelector('.s-current-btn');
        const targetIndex = dotArray.findIndex(dot => dot === targetDot);
        const targrtSlide =carouselSlide[targetIndex];
        moveSlide(currentSlide, targrtSlide);
        updateDot(currDot, targetDot);
        buttonDisplay(targetIndex);
    });
}

//dialogs
let dialogToggler=document.querySelectorAll('.s-dialog-toggle');
if (dialogToggler !== null || dialogToggler !== undefined){
    dialogToggler.forEach(element=>{
        element.addEventListener('click', e=>{
           let  targetData=e.target.dataset;
           let targetId=targetData.target;
           const dialog=document.querySelector(targetId);
           dialog.classList.add('s-show');
        });
    });
}

let dialog=document.querySelectorAll('.s-dialog');
if( dialog !== null || dialog !== undefined ){
    dialog.forEach(dialog=>{
        dialog.addEventListener('click', e=>{
            if(dialog.classList.contains('persist')){
                let childElement=dialog.children[0]
                e.stopPropagation();
            }
            if(e.target.classList.contains('s-dialog-container') || e.target.classList.contains('s-dialog-action')){
                e.stopPropagation();
            }
            else if(e.target.classList.contains('s-dialog') || e.target.classList.contains('s-btn')){
                dialog.classList.remove('s-show');
            }
        });
    });
}

//navigation drawer
let drawerToggler=document.querySelectorAll('.drawer');
let navigationDrawer =document.querySelector('.s-drawer')
let body = document.querySelector('body')
if (drawerToggler !== null || drawerToggler !== undefined){
    drawerToggler.forEach(element=>{
        element.addEventListener('click', e=>{
            e.preventDefault();
            let dataTarget=element.dataset.target;
            let direction = element.dataset.direction;
            let drawer=document.querySelector(dataTarget);    
            let style = window.getComputedStyle(drawer);
            let matrix = new WebKitCSSMatrix(style.webkitTransform);
    
            if(matrix.isIdentity==true){
                slide(drawer,direction, 0);
            }
            else{
                slide(drawer,direction, 1);
            }
            //close drawer when clicked
            drawer.addEventListener('click', e=>{
                let target = e.target
                if (target.classList.contains('s-drawer-container')){
                    slide(drawer,direction, 0);
                }
                else{
                   e.stopPropagation();
                }
            })
            
        });
    });
       
}

function slide(elem, direction, payload) {
    if (direction == 'left'){
        if(payload == 0){
            elem.style.transition='1s ease';
            elem.style.transform='translate(-100%,0)';  
            body.style.overflow='auto';
        }
        else{
            elem.style.transition='1s ease';
            elem.style.transform='translate(0)';
            body.style.overflow='hidden';
        }
    }

    if (direction == 'top-left'){
        if(payload == 0){
            elem.style.transform='1s ease';
            elem.style.transform='translate(-100%,-100%)';  
            body.style.overflow='auto';
        }
        else{
            elem.style.transition='1s ease';
            elem.style.transform='translate(0)';
            body.style.overflow='hidden';
        }
    }
}
//according js
const accordingContainer =document.querySelectorAll('.s-accordin')
if(accordingContainer !== null || accordingContainer !== undefined){
    accordingContainer.forEach( element=>{
        element.addEventListener('click', e=>{
            let target = e.target;
            let targetChildren =target.children;
            if(target.classList.contains('s-accord-title')){
                const accordContent =target.nextElementSibling;
                const elHeight =target.nextElementSibling.clientHeight;
                let i=1;
                if(elHeight <= 0){
                    try{
                        for(i in target.children){
                            if(targetChildren[i].classList.contains('s-icon')){
                               targetChildren[i].style.cssText="transform: rotate(180deg); transition:all .2s linear"
                            }
                          }
                    }
                    catch(error){
            
                    }
                  slideDown(accordContent);
                 }
                 else if(elHeight >=0){
                    try{
                        for(i in target.children){
                            if(targetChildren[i].classList.contains('s-icon')){
                               targetChildren[i].style.cssText="transform: rotate(360deg);transition:all .2s linear"
                            }
                          }
                    }
                    catch(error){
            
                    }
                  slideUp(accordContent);
                 }
            }
            else{
                try{
                    target.closest('.s-accord-title').click();
                }
                catch(error){
                    
                }
            }
        })
    })
}

function slideUp(elem) {
    //elem.style.transition = "all 4s ease-in-out";
    elem.style.cssText = "display:none; opacity:0";
   
  }
  function slideDown(elem) {
    elem.style.cssText = "display:block; opacity:1";
}
