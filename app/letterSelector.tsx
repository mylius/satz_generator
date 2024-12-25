

interface LetterSelectorProps {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
}

const LetterSelector = ({selectedLetters, setSelectedLetters }:LetterSelectorProps) => {

return (
    <div>
    <input type= "checkbox" value="A" checked={selectedLetters.includes("A")} onChange={(e) => {
        if(e.target.checked) {
            setSelectedLetters([...selectedLetters, "A"])
        } else {
            setSelectedLetters(selectedLetters.filter((letter) => letter !== "A"))
        }
    }} />
    <input type= "checkbox" value="B" checked={selectedLetters.includes("B")} onChange={(e) => {
        if(e.target.checked) {
            setSelectedLetters([...selectedLetters, "B"])
        } else {
            setSelectedLetters(selectedLetters.filter((letter) => letter !== "B"))
        }
    }} />
    <input type= "checkbox" value="C" checked={selectedLetters.includes("C")} onChange={(e) => {
        if(e.target.checked) {
            setSelectedLetters([...selectedLetters, "C"])
        } else {
            setSelectedLetters(selectedLetters.filter((letter) => letter !== "C"))
        }
    }} />
    <input type= "checkbox" value="D" checked={selectedLetters.includes("D")} onChange={(e) => {
        if(e.target.checked) {
            setSelectedLetters([...selectedLetters, "D"])
        } else {
            setSelectedLetters(selectedLetters.filter((letter) => letter !== "D"))
        }
    }} /> 
    </div>
)
}
    
export default LetterSelector;
