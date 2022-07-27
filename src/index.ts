import './styles.scss'
import Word from './scripts/Word'
import getRandomInt from './scripts/utils/getRandomInt'

const wordsContainer = document.getElementById('wordsContainer') as HTMLDivElement
const infoBar = document.getElementById('info') as HTMLParagraphElement

const words:Word[] = []

for (let i = 0; i < 10; i++) {
    const randomIndex = getRandomInt(20)
    words.push(new Word(randomIndex))    
}



words.forEach(word => {
    wordsContainer.append(word.getDomElement())
})


let currentWordCounter = 0
let wordFinished = false

words[0].setActive(true)

document.addEventListener("keydown", (e:KeyboardEvent) => {

    words[currentWordCounter].onFinished = () => {
        wordFinished = true
        infoBar.textContent = "Press space for next word!"

    }

    if(wordFinished === true && e.key === " "){
        currentWordCounter++
        infoBar.textContent = ""
        if(currentWordCounter === words.length){
            infoBar.textContent = "Done!"
            return
        }
        words[currentWordCounter - 1].setActive(false) // poprzednie slowo staje sie nieaktywne
        words[currentWordCounter].setActive(true) 
        wordFinished = false
        return
    }

    if(e.key === words[currentWordCounter].getCurrentLetter().toString()){
        words[currentWordCounter].nextLetter(true)
        return
    }
    words[currentWordCounter].nextLetter(false)


})


