import wordList from './words/easy.json' // array
import Letter from './Letter'

export default class Word {
  private length:number // length of Word object - how many Letter objects it contains in letters Array 
  private id:number // index for wordList
  private name:string // word in string form
  private letters:Letter[] // Letter objects store
  private currentLetter:number = 0 // indicates index of active Letter object (letters Array)
  private active:boolean = false // indicates if word is active or not
  private domElement:HTMLDivElement // stores dom representations of Word object

  /**
   * Create object from the id ()  
   * @param id the index referring to the array in .json file
   */
  constructor(id:number){
    this.id = id
    this.name = wordList[id]
    this.length = this.name.length
    this.letters = Word.convertStringToLettersArray(this.name)
    this.domElement = Word.createDomRepresentation(this.letters)
  }

  /**
   * Convert string into array containing Letter class objects
   * @param str - word in string format
   * @returns Array of Letter objects
   */
  private static convertStringToLettersArray(str:string):Letter[]{
    const temp:Letter[] = []
    for(const strChar of str) temp.push(new Letter(strChar))
    return temp
  }
  
  /**
   * Creates HTML element (div) with "word" className from given Letter array.
   * @param Array containg Letter objects
   * @returns HTML div element
   */
  private static createDomRepresentation(letters:Letter[]):HTMLDivElement{
    const temp = document.createElement('div')
    temp.classList.add("word")
    letters.forEach((letter:Letter) => temp.append(letter.getDomElement()))
    return temp
  }

  /**
   * Returns domElement
   * @returns domElement
   */
  public getDomElement():HTMLDivElement{
    return this.domElement
  }

  /**
   * Returns reference to Letter object which is active in current time
   * @returns active Letter object 
   */
  public getCurrentLetter():Letter{
    return this.letters[this.currentLetter]
  }

  /**
   * Set if Word object is active or not. Change background color and set as active first letter of Word object 
   * @param state - true for activation, false for deactivation
   * @returns 
   */
  public setActive(state:boolean):void{
    this.active = state
    if(state){
      this.domElement.classList.add("word-active")
      this.letters[this.currentLetter].setActive(true)
      return
    }
    this.domElement.classList.remove("word-active")
    this.letters[this.currentLetter].setActive(false) // wylaczam podswietlenie literek po zakonczeniu pisania slowa
  }

  /**
   * Execute when word is finished (to override)
   */
  public onFinished(){}

  /**
   * Set as active next letter
   * @param state true if typed letter was correct, false if incorrect
   */
  public nextLetter(state:boolean){

    if(this.currentLetter === this.length - 1){
      this.letters[this.currentLetter].setCorrect(state)
      this.letters[this.currentLetter].setActive(false)
      this.onFinished()
      return
    }

    this.currentLetter++
    this.letters[this.currentLetter - 1].setActive(false)

    if(this.currentLetter < this.length) this.letters[this.currentLetter].setActive(true)
    

    this.letters[this.currentLetter - 1].setCorrect(state)
    
    


  }

  // getter active
  public isActive():boolean{
    return this.active
  }

  /**
   * Return length of Word object (how many Letters objects it contains)
   * @returns 
   */
  public getLength():number{
    return this.length
  }
  
}