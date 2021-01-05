// Ex4 - 서로 다른 기능의 여러버튼을 가진 화면에서 이벤트를 처리하는 방법

window.addEventListener('load',function(){

    var section = document.querySelector('#section4');
    //.notice-list 안에있는 tbody
    var tbody = section.querySelector(".notice-list tbody");

    tbody.onclick = function(e){
        var target = e.target;
        
        if(target.nodeName !="INPUT"){
            return;
        }
        
        // 클래스중에sel-button있느냐? 이렇게 묻는코드
        //document.body.classList.contains("sel-button");

        
        if(target.classList.contains = "sel-button"){
            var tr = target.parentElement;
            for(; tr.nodeName !="TR"; tr =tr.parentElement ){
                tr.parentElement.style.background = "yellow";
            }
           

    //     }else if(target.classList.contains = "del-button"){
    //         console.log('del');

    //     }else if(target.classList.contains = "edit-button"){
    //         console.log('edit');

    //     }
    }
}  
});








// Ex3-이벤트 버블링 멈추기
window.addEventListener("load", function(){

    var section = document.querySelector("#section3");
    
    var imgList = section.querySelector(".img-list"); 
    var addButton = section.querySelector(".add-button");
    var currentImg = section.querySelector(".current-img");
    var div_ = document.querySelector("#div_");
    
    imgList.onclick = function(e){
        console.log('imgList.onclick')
        if(e.target.nodeName !='IMG'){
            return;
        }
        currentImg.src = e.target.src;
    };  
    addButton.onclick = function(e){
        //전파 되는것을 막아라;(부모로가는 버블링 방지 )
        e.stopPropagation();
        console.log('addButton.onclick');
        var img = document.createElement('img');
        img.src = 'images/img1.jpg';
        //요너석 다음에 넣겠다.(afterend 태그가 닫히는부분)
        currentImg.insertAdjacentElement('afterend',img);
    };

}); 





//Ex2-이벤트 버블링을 이용해 사용자 이벤트 처리하기:event Bubbling
window.addEventListener("load", function(){

    var section = document.querySelector("#section2");
    //배열을 가져오지 않고 하나만 얻어옴 
    var imgList = section.querySelector(".img-list"); 
    var currentImg = section.querySelector(".current-img");
    
    //
    imgList.onclick = function(e){
        if(e.target.nodeName !='IMG'){
            return;
        }
        currentImg.src = e.target.src;
    };  

}); 




//연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener("load", function(){
    var del_button = document.querySelectorAll(".del-button");
    console.log(del_button);

    for(var i = 0; i < del_button.length; i++){
        
        //클릭하면 e가 선택한 객체가 넘어옴 
        del_button[i].onclick = function(e){
            console.log(e.target.nodeName);
            e.target.parentElement.parentElement.remove();
        }
    }


}); 



//Ex1-선택된 이미지 보여주기:event target
window.addEventListener("load", function(){

    var section = document.querySelector("#section1");
    
    var imgs = section.querySelectorAll(".img");
    var currentImg = section.querySelector(".current-img");

    //target 현재 선택된 객체 
    

    // imgs[0].onclick = function(e){
    //     currentImg.src = e.target.src; 
    // }
    // imgs[1].onclick = function(e){
    //     currentImg.src = e.target.src; 
    // }
    // imgs[2].onclick = function(e){
    //     currentImg.src = e.target.src; 
    // }

    //위에 코드를 이렇게 한다고 좋은게 아님
    //버를링을 하는게 좋음 
    //지금까지 배운걸로는 반복문을 사용하는게 최선임.
    for(var i=0; i<imgs.length; i++){
        imgs[i].onclick = function(e){
            currentImg.src = e.target.src; 
        }
    }


}); 