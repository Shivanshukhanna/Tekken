
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
