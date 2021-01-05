//Ex10-클릭한 컬럼을 기준으로 레코드 정렬하기 #1
window.addEventListener("load", function(){

    var notices = [
        {"id":1, "title":"사랑합니다", "regDate":"2019-02-05", "writerId":"newlec", "hit":2},
        {"id":2, "title":"자바스크립트란..", "regDate":"2019-02-02", "writerId":"newlec", "hit":0},
        {"id":3, "title":"미안해요", "regDate":"2019-02-01", "writerId":"newlec", "hit":1},
        {"id":4, "title":"안녕하세요", "regDate":"2019-01-25", "writerId":"newlec", "hit":0}
    ];

    var section = document.querySelector("#section10");
    
    var noticeList =section.querySelector(".notice-list");
    var titldTd = section.querySelector(".title");
    var tbodyNode = noticeList.querySelector("tbody");

    var bindData = function(){
        var template = section.querySelector("template");

        for(var i=0; i<notices.length; i++){
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");
            tds[0].textContent = notices[i].id;            

            var aNode = tds[1].children[0];
            aNode.href=notices[i].id;
            aNode.textContent = notices[i].title;

            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;

            tbodyNode.appendChild(cloneNode);
        }
    };

    bindData();

    var titleSorted = false;

    titldTd.onclick = function(){
        //지우는내용 작성
        //tbody내용을 전부 지움
        tbodyNode.innerHTML = '';

        //정렬이 안될 상태 일떄 실행 
        if(!titleSorted){
            //뭐가큰지 기준점을 제공해야함
            notices.sort(function (a, b) {
                //나 정렬 했어요..
                titleSorted = true;
                if (a.title < b.title) {
                    return -1;
                } else if (a.title < b.title) {
                    return 1;
                } else {
                    return 0;
                }
                
     
            });
        }else{
            notices.reverse();
        }

        bindData();
    };
});

//Ex9-다중 노드선택 방법과 일괄삭제, 노드의 자리바꾸기
window.addEventListener("load", function(){

    var section = document.querySelector("#section9");
    
    var noticeList =section.querySelector(".notice-list"); 
    var tbody = noticeList.querySelector("tbody");
    var allCheckbox = section.querySelector(".overall-checkbox");
    var delButton = section.querySelector(".del-button");
    var swapButton = section.querySelector(".swap-button");

    //체크 사항이 변경되었을 떄 
    allCheckbox.onchange = function(){
        // console.log(allCheckbox.value);
        // true , false가 뜸 
                                          //input태그의 checkBox타입만 가져오겠다.
        var inputs = tbody.querySelectorAll("input[type='checkBox']");

        
        for (var i=0; i<inputs.length;i++){
            //하나하나가 전체 체크박스 상태로 바뀜                
            inputs[i].checked = allCheckbox.checked;
        }
        
      
        
    };

    delButton.onclick = function(){
                                            //체크박스중 선택된녀석만 가져온다.
        var inputs = tbody.querySelectorAll("input[type='checkBox']:checked");

        console.log(inputs.length);
        // if(inputs[0].checked){
        //     inputs[0].parentElement.parentElement.remove();
        // }

        for(var i= 0 ;i<inputs.length; i++){
            inputs[i].parentElement.parentElement.remove();
        }

        //(혼자연습) 전체를 선택하는 체크박스 체크 없애기 
        // if(allCheckbox.checked == true){
        //     allCheckbox.checked = false;
        // }
      


        
    };

    swapButton.onclick = function(){
        var inputs = tbody.querySelectorAll("input[type='checkBox']:checked");
        if(inputs.length != 2 ){
            alert('엘리먼트는 2개를 선택해야 합니다.');
            return;
        }

        //tr의 단위를 수집하겠다.
        var trS = [];

        //선택된 2개의 tr를 trS로 넣어줌
        for(var i =0; i<inputs.length; i++){
            trS.push(inputs[i].parentElement.parentElement);
        }

        //어떻게 바꿀 것인가?
        //바꾸고자하는것을 사본(클론)을 만든 후 바꾸고자 위치에 보낸다.
        //그리고 바꾸고자하는것이 빠지고 그리고 원하는 위치에 삽입 
        //replacieWith

        // 복사본 생성 
        var cloneNode = trS[0].cloneNode(true);
        //클론될 녀석을 넣고 자기가 빠진다
        trS[1].replaceWith(cloneNode);
        trS[0].replaceWith(trS[1]);
         


        


    };

});

//Ex8-노드 삽입과 바꾸기
window.addEventListener("load", function(){

    var section = document.querySelector("#section8");
    
    var noticeList =section.querySelector(".notice-list"); 
    var tbodyNode = noticeList.querySelector("tbody");
    var upButton = section.querySelector(".up-button");
    var downButton = section.querySelector(".down-button");

    //첫번째 tr을 가리킴
    var currentNode = tbodyNode.firstElementChild;//.children[0];

    downButton.onclick = function(){
        var nextNode = currentNode.nextElementSibling;
        
        if(nextNode == null){
            alert('더 이상 이동할 수 없습니다.');
            return;
        }
        
        
        // //tbodyNode.removeChild(nextNode); 이게없어도 사실 가능하다.
        // tbodyNode.insertBefore(nextNode, currentNode);  //요거 하나라도 가능

        //너 내앞으로 와(타겟을 기준으로 앞에와)
        currentNode.insertAdjacentElement('beforebegin', nextNode )

    };

    upButton.onclick = function(){
        var previousNode = currentNode.previousElementSibling;

        if(previousNode == null){
            alert('더 이상 이동할 수 없습니다.');
            return;
        }
        // //tbodyNode.removeChild(currentNode);
        // tbodyNode.insertBefore(currentNode,previousNode);

        //위의 방법보다 훨씬 직관적이고 깔끔하다.
        currentNode.insertAdjacentElement('afterend', previousNode )
       
    };

});


//Ex7 : 노드 복제와 템플릿 태그
window.addEventListener("load", function(){
    var notices = [
        {id:5, title:"퐈이야~~~", regDate:"2019-01-26", writerId:"newlec", hit:0},
        {id:6, title:"나 좀 복제해줘~", regDate:"2019-01-26", writerId:"newlec", hit:17}
    ];

    var section = document.querySelector("#section7");
    
    var noticeList =section.querySelector(".notice-list"); 
    var tbodyNode = noticeList.querySelector("tbody");
    var cloneButton = section.querySelector(".clone-button");
    var templateButton = section.querySelector(".template-button");

    cloneButton.onclick = function(){
        var trNode = noticeList.querySelector("tbody tr");
        var cloneNode = trNode.cloneNode(true);
        var tds = cloneNode.querySelectorAll("td");
        tds[0].textContent = notices[0].id;
        tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';
        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerId;
        tds[4].textContent = notices[0].hit;

        tbodyNode.appendChild(cloneNode);
        
    };

    templateButton.onclick = function(){
        var template = section.querySelector("template");

        for(var i=0; i<notices.length; i++){
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");
            tds[0].textContent = notices[i].id;
            //tds[1].innerHTML = '<a href="'+notices[0].id+'">'+notices[0].title+'</a>';

            var aNode = tds[1].children[0];
            aNode.href=notices[i].id;
            aNode.textContent = notices[i].title;

            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;

            tbodyNode.appendChild(cloneNode);
        }
        
        
    };

});


//Ex6 : 메뉴추가(createTextNode, Element)
window.addEventListener("load", function(){
    var section = document.querySelector("#section6");
    
    var titleInput =section.querySelector(".title-input"); 
    var menuListUl =section.querySelector(".menu-list"); 
    var addButton = section.querySelector(".add-button");
    var delButton = section.querySelector(".del-button");

    addButton.onclick = function(){
        var title = titleInput.value;

        var html = '<a href="">'+title+'</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        //menuListUl.appendChild(li);

        menuListUl.append(li);

        /* var title = titleInput.value;
        var txtNode = document.createTextNode(title);
        var aNode = document.createElement("a");
        aNode.href="";
        aNode.appendChild(txtNode);
        var liNode = document.createElement("li");
        liNode.appendChild(aNode);
        menuListUl.appendChild(liNode); */

        /* var title = titleInput.value;
        var txtNode = document.createTextNode(title);
        menuListDiv.appendChild(txtNode); */
        

    };

    delButton.onclick = function(){
        //var txtNode = menuListUl.childNodes[0];
      
        var liNode = menuListUl.children[0];
        //menuListUl.removeChild(liNode);
        liNode.remove();

    };

});

//Ex5 : 엘리먼트 노드의 속성& CSS 속성 변경
window.addEventListener("load", function(){
    var section = document.querySelector("#section5");
    var srcInput = section.querySelector(".src-input");
    var imgSelect = section.querySelector(".img-select");
    var changeButton = section.querySelector(".change-button");
    var img = section.querySelector(".img");
    var colorInput = section.querySelector(".color-input");

    changeButton.onclick = function(){
        img.src = "images/"+srcInput.value;
        //img.src = "images/"+imgSelect.value;
        
        //img.style.border-color = ?;
        //img.style["border-color"] = colorInput.value;
        img.style.borderColor = colorInput.value;
        console.log(img.className);
        
    };

});

//Ex4 : childeNodes를 이용한 노드 선택
window.addEventListener("load", function(){
    var section4 = document.querySelector("#section4");
    var box = section4.querySelector(".box");

    var input1 = box.children[0];// .childNodes[0];
    var input2 = box.children[1];

    input1.value = "hello";
    input2.value = "okay";

});

//Ex3 : Selectors API Level1
window.addEventListener("load", function(){
    var section3 = document.getElementById("section3");
    var txtX = section3.querySelector("input[name='x']");
    var txtY = section3.querySelector(".txt-y");
    var btnAdd = section3.querySelector(".btn-add");
    var txtSum = section3.querySelector(".txt-sum");

    btnAdd.onclick = function () {   
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);  
           
        txtSum.value = x+y; 

         
    };
});

//Ex2 : 엘리먼트 선택방법 개선하기
window.addEventListener("load", function(){
    var section2 = document.getElementById("section2");
    var txtX = section2.getElementsByClassName("txt-x")[0];
    var txtY = section2.getElementsByClassName("txt-y")[0];
    var btnAdd = section2.getElementsByClassName("btn-add")[0];
    var txtSum = section2.getElementsByClassName("txt-sum")[0];

    /*
    var inputs = section2.getElementsByTagName("input");

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */

    btnAdd.onclick = function () {         
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);
           
        txtSum.value = x+y;      
         
    };
});

//Ex1 : 계산기 프로그램
window.addEventListener("load", function(){
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var btnAdd = document.getElementById("btn-add");
    var txtSum = document.getElementById("txt-sum");
   
    btnAdd.onclick = function () {               
         
        txtSum.value = parseInt(txtX.value)+ parseInt(txtY.value);
    };
});