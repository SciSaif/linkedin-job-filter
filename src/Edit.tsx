import { useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

interface Props {
    excludeList: string[];
    addWord: (word: string) => void;
    removeWord: (word: string) => void;
    back: () => void;
}

function Edit({ excludeList, addWord, removeWord, back }: Props) {
    const [inputData, setInputData] = useState("");

    const handleAdd = (e: any) => {
        e.preventDefault();
        addWord(inputData);
        setInputData("");
    };

    return (
        <div className="edit snow">
            <div className="back" onClick={back}>
                <HiArrowNarrowLeft size="25px" />
            </div>
            <p className="info">
                Add job names that should be excluded (case insensitive)
            </p>
            <div className="words ">
                {excludeList.length ? (
                    excludeList.map((word) => (
                        <div className="word">
                            <div className="word-text">{word}</div>
                            <span
                                className="cross"
                                onClick={() => removeWord(word)}
                            >
                                &times;
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="words">
                        It's empty! Add a job to exclude
                    </div>
                )}
            </div>

            <form className="inputBox" onSubmit={handleAdd}>
                <input
                    type="text"
                    className="wordsInput text-black"
                    id="wordsInput"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    required
                />
                <button type="submit" className="add">
                    Add
                </button>
            </form>
        </div>
    );
}

export default Edit;
