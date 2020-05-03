
'use strict';
//dialog
let dtoggle =document.querySelector('.s-dialog-toggle');
let dialogToggler=document.querySelectorAll('.s-dialog-toggle');
try{
dialogToggler.forEach(element=>{
    element.addEventListener('click', e=>{
       let  targetData=e.target.dataset;
       let targetId=targetData.target;
       const dialog=document.querySelector(targetId);
       dialog.classList.add('s-show');
    });
});
}
catch(error){
    //fail silently
}

let dialog=document.querySelectorAll('.s-dialog');
try{
dialog.forEach(dialog=>{
    dialog.addEventListener('click', e=>{
        if(e.target.classList.contains('s-dialog-container') || e.target.classList.contains('s-dialog-action') || e.target.classList.contains('persist')){
            e.stopPropagation();
        }
        else if(e.target.classList.contains('s-dialog') || e.target.classList.contains('s-btn')){
            console.log('no',e)
            dialog.classList.remove('s-show');
        }
    });
});
}
catch(error){
    //fail silently
}

//drawer
let drawerToggler=document.querySelectorAll('.drawer');
let navigationDrawer =document.querySelector('.s-drawer')
let body = document.querySelector('body');
try{
    drawerToggler.forEach(element=>{
    element.addEventListener('click', e=>{
        e.preventDefault();
        let dataTarget=element.dataset.target;
        let direction = element.dataset.direction;
        let drawer=document.querySelector(dataTarget);
        //let style = window.getComputedStyle(drawer, null).getPropertyValue("transform");

        let style = window.getComputedStyle(drawer);
        let matrix = new WebKitCSSMatrix(style.webkitTransform);

        console.log(matrix.isIdentity);
        if(matrix.isIdentity==true){
            slide(drawer,direction, 0)
        }
        else{
            slide(drawer,direction, 1) 
        }
        //close drawer when clicked
        drawer.addEventListener('click', e=>{
            let target = e.target
            if (target.classList.contains('s-drawer-container')){
                slide(drawer,direction, 0)
            }
            else{
               e.stopPropagation()
            }
        })
        
    });
});
}catch(error){
    //fail silently
}

function slide(elem, direction, payload) {
    if (direction == 'left'){
        if(payload == 0){
            elem.style.transition='1s ease';
            elem.style.transform='translate(-100%,0)';  
            body.style.overflow='hidden'
        }
        else{
            elem.style.transition='1s ease';
            elem.style.transform='translate(0)';
            body.style.overflow='hidden'
        }
    }

    if (direction == 'top-left'){
        if(payload == 0){
            elem.style.transform='1s ease';
            elem.style.transform='translate(-100%,-100%)';  
            body.style.overflow='auto'
        }
        else{
            elem.style.transition='1s ease';
            elem.style.transform='translate(0)';
            body.style.overflow='hidden'
        }
    }
}
//end drawer

//according js
const accordingContainer = document.querySelectorAll('.s-accordin')
try{
  accordingContainer.forEach(element => {
    element.addEventListener('click', e => {
      let target = e.target;
      let targetChildren = target.children
      if (target.classList.contains('s-accord-title')) {
        const accordContent = target.nextElementSibling;
        const elHeight = target.nextElementSibling.clientHeight;
        let i = 1;
        if (elHeight <= 0) {
          try {
            for (i in target.children) {
              if (targetChildren[i].classList.contains('s-icon')) {
                targetChildren[i].style.cssText = "transform: rotate(180deg); transition:all .2s linear"
              }
            }
          } catch (error) {

          }
          slideDown(accordContent);
        } else if (elHeight >= 0) {
          try {
            for (i in target.children) {
              if (targetChildren[i].classList.contains('s-icon')) {
                targetChildren[i].style.cssText = "transform: rotate(360deg);transition:all .2s linear"
              }
            }
          } catch (error) {

          }
          slideUp(accordContent);
        }
      } else {
        try {
          target.closest('.s-accord-title').click();
        } catch (error) {

        }
      }
    })
  })
}
catch (reeor){
    //fail silently
}
function slideUp(elem) {
  //elem.style.transition = "all 4s ease-in-out";
  elem.style.cssText = "display:none; opacity:0";

}

function slideDown(elem) {
  elem.style.cssText = "display:block; opacity:1";
}
//end 



function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
function appendError(a){
    let errordiv = document.createElement("div");
    errordiv.innerHTML = "This field is required";
    errordiv.classList.add('errordiv');
    insertAfter(errordiv,  a);
    
    //check if errordiv already exist, if so set to display none
    let nextElement = a.nextElementSibling.nextElementSibling;
    console.log(nextElement, 'before removed')
        if(nextElement.classList.contains('errordiv')){
            nextElement.classList.add('none')
            nextElement.style.display ='none';
            console.log('ran remove')
        }
        else{
            console.log('else remove')
        }
}
function removeError(b){
    let nextElement = b.nextElementSibling;
    try{
        if(nextElement.classList.contains('errordiv')){
            nextElement.style.display ='none';
        }
    }
    catch{
        //
    }
    b.classList.remove('s-danger-outline');
}
let forms = document.querySelectorAll('.s-form');
try{
    forms.forEach( form =>{
    let formArray = Array.from(form);
    form.addEventListener('click', e=>{
        e.preventDefault();
        let target = e.target;
        if(target.classList.contains('s-form-btn')){
            let form = target.parentNode;
            let formElement = Array.from(form);
            formElement.forEach(element=>{
               if(element.classList.contains('s-required')){
                if(element.value === '' || element.value === null || element.value === undefined ){
                    appendError(element);
                };
               };
            });
        };
    });
    //on focusout
    for(let i =0; i <= formArray.length -1; i++){
        if(formArray[i].classList.contains('s-required')){
            formArray[i].addEventListener('focusout', ()=>{
                let val = formArray[i].value;
                if(val === '' || val == null){
                    appendError(formArray[i]);
                }
                else if(val !== '' || val !== null){
                    removeError(formArray[i]);
                };
            });
        }
    };
});
}
catch(error){
    console.log(error);
}


// alert 
let disAlert =document.querySelectorAll('.s-dismissable');
try{
    disAlert.forEach(element=>{
  element.addEventListener('click', e=>{
    let target=e.target;
    if(target.classList.contains('s-icon')){
        element.style.display='none';
    }
  });
})
}catch(error){
    //fail silently
}

//dropdown menue 
const toggle =document.querySelectorAll('.s-toolbar');
try{
    toggle.forEach(element=>{
    let elem = element;
    element.addEventListener('click', e=>{
        let target =e.target;
        if(target.classList.contains('triger')){
            let a =Array.from(element.children);
            let i =0;
           a.forEach( e=>{
               if(e.classList.contains('s-nav-container')){
                if(e.classList.contains('dropdown')){
                    e.classList.remove('dropdown');
                }
                else{
                    e.classList.add('dropdown')
                }
               }
               i++;
           })
        }
    });
})
}
catch(error){
    //fail silently
}


const inputField = document.querySelectorAll('.s-input-field');
try{
    inputField.forEach(element=> {
    element.addEventListener('focusout', e=>{
        let target =e.target
        let label = target.nextSibling.nextSibling
        if(element.value === '' || element.value === undefined || element.value === null){
            label.classList.add('s-opasity-5');
            label.classList.remove('s-opasity-1-t0');

        }
        else{
            //set opasity to  .1 and top to 0
            label.classList.add('s-opasity-1-t0');
            label.classList.remove('s-opasity-5');
        }
    })
});
}
catch(error){
    //fail silently
}

//password
const inputgroup= document.querySelectorAll('.s-input-group');
try{
    inputgroup.forEach(element=>{
    element.addEventListener('click', e=>{
        let target =e.target;
        if(target.classList.contains('s-input')){
            if(target.type === 'password'){
                let eye = target.nextElementSibling;
                target.addEventListener('keyup', ()=>{
                    if(target.value !== ''){
                        eye.style.cssText='visibility:visible';
                    }
                    else{
                        eye.style.cssText='visibility:hidden';
                    }
                    
                });
            }
        }
    });
});
}
catch(error){
    //fail silently
}

//toggle passwords
const pwordtogl =document.querySelectorAll('.s-eye');
try{
    pwordtogl.forEach(element=>{
    element.addEventListener('click', e=>{
        let target = e.target;
        let container = e.target.closest('.s-input-group');
        let arr = container.childNodes;
        arr.forEach(item=>{
            if(item.type === 'password'){
                item.type='text';
                target.classList.remove('mdi-eye-outline')
                target.classList.add('mdi-eye-off-outline');
            }
            else if(item.type === 'text'){
                item.type='password';
                target.classList.remove('mdi-eye-off-outline');
                target.classList.add('mdi-eye-outline');
            }
        })
    });
});
}
catch(error){
    console.error(error)
}

// flip card 
const flipCard= document.querySelectorAll('.s-flip-card');
try{
    flipCard.forEach(element=>{
    element.addEventListener('click', e=>{
        let target= e.target;
        if(target.classList.contains('s-flip-btn')){
            element.classList.add('s-flip');
            element.classList.remove('s-flip-back');
        }
        else if(target.classList.contains('s-back')){
            element.classList.add('s-flip-back');
            element.classList.remove('s-flip');
        }
    });
});
}
catch(error){
    //fail silently
}


//scrollspy
const scrollSpy=document.querySelector('.s-scroll-spy');
try{
    const scrollSpyArr = Array.from(scrollSpy.children);

const secPos ={}
let secId = []
scrollSpyArr.forEach(section=>{
    secId.push(section.id)
    secPos[section.id] = section.getBoundingClientRect( ).top; 
});
 
 const scrollFunk =()=>{
    let scrollPosition =document.documentElement.scrollTop
    || document.body.scrollTop;
    
    let id =secId;
    for(id in secPos){
        if(secPos[id] <= scrollPosition){
            document.querySelector('.s-active').classList.remove('s-active');
            document.querySelector(`a[href*=${id}]`).classList.add('s-active');
        }
    }
 };

 window.onscroll= ()=>{
    scrollFunk();
    scrollFunction();
 }
}catch(error){
    //fail silently
}

 //scroll back to top:
 let toTopbtn = document.getElementById("btop");
try{
    toTopbtn.addEventListener('click', ()=>{
        topFunction();
     })
 }
catch(error){
    //fail silently
}

 function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      toTopbtn.style.display = "flex";
    } else {
      toTopbtn.style.display = "none";
    }
  }
  
// When user clicks on the button, scroll to  top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
//end