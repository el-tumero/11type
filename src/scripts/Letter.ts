export default class Letter {

    private domElement:HTMLDivElement
    private character:string
    private active:boolean = false
    private correct!:boolean 
  
    constructor(character:string){
      this.character = character
      this.domElement = this.createDomRepresentation(character)
    }
  
    private createDomRepresentation(character:string):HTMLDivElement{
      const text = document.createTextNode(character)
      const div = document.createElement('div')
      div.classList.add('letter') // dodawanie stylu z klasy w cssie
      div.appendChild(text)
      return div// zwracamy diva z dodana wewnatrz literka
    }

    /**
     * Set letter as active or not. Changes color of letter to red.
     * @param state - true for activation, false for deactivation
     * @returns 
     */
    public setActive(state:boolean){
        this.active = state
        if(state){
            this.domElement.classList.add('letter-active')
            return
        }

        this.domElement.classList.remove("letter-active")
    }

    /**
     * Set Letter object as correct typed or not. Change letter color in DOM if incorrect.
     * @param state - true for correct, false for incorrect
     * @returns 
     */
    public setCorrect(state:boolean){
      this.correct = state
      if(state) this.domElement.classList.add("letter-correct")
      if(!state) this.domElement.classList.add("letter-incorrect")
    }
  
    /**
    * Return domElement
    * @returns domElement
    */
    public getDomElement():HTMLDivElement{
      return this.domElement
    }

    /**
    * Return letter in string form
    * @returns letter in string form
    */
     public toString():string{
      return this.character
    }
  }