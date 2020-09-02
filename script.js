const slider = document.querySelector(".slider");
const btns = document.querySelectorAll(".btn");
const slides = document.querySelectorAll(".img");
const options = document.querySelectorAll('.option');

var index = 1;
var op_index = 0;
var size = slides[index].clientWidth;

update();

function update(){
	slider.style.transform = "translateX("+ (-size * index) +"px)";

}

function slide(){
	slider.style.transition = "transform .5s ease-in-out";
    update();
}

function btnCheck(){
	if(this.id === "prev"){
		index--;
		if(op_index === 0){
			op_index = 4;
		}
		else{
			op_index--;
		}
	}
	else{
		index++;
		if(op_index === 4){
			op_index = 0;
		}
		else{
			op_index++;
		}
	}

	slide();
}

function optionFunc(){
	let i = Number(this.getAttribute('op-index'));
	op_index = i;
	index = i + 1;

	slide();
}



slider.addEventListener('transitionend', () => {
	if(slides[index].id === "first"){
		slider.style.transition = "none";
		index = slides.length - 2;
		slider.style.transform = "translateX("+ (-size * index) +"px)";
	}
	else if(slides[index].id === "last"){
		slider.style.transition = "none";
		index = 1;
		slider.style.transform = "translateX("+ (-size * index) +"px)";
	}
})

btns.forEach(btn => btn.addEventListener('click', btnCheck));
options.forEach(option => option.addEventListener('click', optionFunc));

const button =document.getElementById('btn');
const list=document.getElementById('list');
list.style.display="none";
function hide(){
  if(list.style.display="none")
  {
    list.style.display="block";
  }else
    {
      list.style.display="none";
    }
}
class healthbar {
  constructor(element,initialValue=0) {
    this.valueElem= element.querySelector('.health-bar-value');
    this.fillElem=element.querySelector('.health-bar-fill');

    this.setValue(initialValue);
  }
    setValue(newValue){
      this.value=newValue;
      this.update();
    }
    update(){
      const percentage= this.value +'%';

      this.fillElem.style.width=percentage;
      this.valueElem.textContent=percentage;
    }
}

 const pb1=new healthbar(document.querySelector('.health-bar'),100);
