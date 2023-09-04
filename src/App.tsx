import { useState, useEffect } from "react";
import Edit from "./Edit";

import { ImArrowRight } from "react-icons/im";
/* eslint-disable no-undef */

function App() {
    const [active, setActive] = useState(false);
    const [excludeList, setBadWords] = useState(() => {
        let inStorage = localStorage["excludeList"];
        if (inStorage != null) {
            return JSON.parse(inStorage);
        } else return [];
    });

    const [editMode, setEditMode] = useState(false);

    const addWord = (word) => {
        let newExcludeList = [...excludeList];
        newExcludeList.push(word);
        localStorage["excludeList"] = JSON.stringify(newExcludeList);
        setBadWords(newExcludeList);
        // restartScript();
    };

    const removeWord = (word) => {
        let newExcludeList = excludeList.filter((e) => e !== word);
        localStorage["excludeList"] = JSON.stringify(newExcludeList);
        setBadWords(newExcludeList);
        // restartScript();
    };

    useEffect(() => {
        /* eslint-disable no-undef */
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { message: "scriptRunning?" },
                    function (response) {
                        if (response === true) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }
                );
            }
        );
    }, []);

    /* eslint-disable no-undef */

    async function handleBtnClick() {
        console.log("e1");
        await chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                console.log("e2");
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { message: "toggleScript", excludeList },
                    function (response) {
                        if (response === true) {
                            console.log("e3");
                            setActive(true);
                        } else {
                            console.log("e4");
                            setActive(false);
                        }
                    }
                );
            }
        );
    }

    return (
        <div className="app sprinkles">
            {!editMode && (
                <>
                    <h2 className="heading">Linkedin Job Filter</h2>
                    <div className="sub-heading">Filter out spam jobs</div>
                    <div className="main">
                        <div
                            className="words-box"
                            onClick={() => setEditMode(true)}
                        >
                            <div className="words-heading">Jobs to hide </div>
                            <ImArrowRight />
                        </div>
                        <button
                            className={active ? "main-btn" : "main-btn "}
                            onClick={handleBtnClick}
                        >
                            {active ? "Stop" : "Start"}
                            <span
                                className={
                                    active
                                        ? "started__inner"
                                        : " main-btn__inner"
                                }
                            >
                                <span
                                    className={
                                        active
                                            ? "started__blobs"
                                            : "main-btn__blobs"
                                    }
                                >
                                    <span
                                        className={
                                            active
                                                ? "started__blob"
                                                : "main-btn__blob"
                                        }
                                    ></span>
                                    <span
                                        className={
                                            active
                                                ? "started__blob"
                                                : "main-btn__blob"
                                        }
                                    ></span>
                                    <span
                                        className={
                                            active
                                                ? "started__blob"
                                                : "main-btn__blob"
                                        }
                                    ></span>
                                    <span
                                        className={
                                            active
                                                ? "started__blob"
                                                : "main-btn__blob"
                                        }
                                    ></span>
                                </span>
                            </span>
                        </button>
                    </div>
                </>
            )}
            {editMode && (
                <Edit
                    excludeList={excludeList}
                    addWord={(word) => addWord(word)}
                    removeWord={(word) => removeWord(word)}
                    back={() => setEditMode(false)}
                />
            )}
        </div>
    );
}

export default App;
