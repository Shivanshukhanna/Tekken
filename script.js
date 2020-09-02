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
