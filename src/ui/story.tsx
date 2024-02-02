/**
 * @file Story text and popups
 */
import React, { useState } from "react";
// import ReactDOM from "react-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import Game from "../game";
import { uiLayer } from "./uiLayer";

// eslint-disable-next-line jsdoc/require-param
/**
 * @returns React component for the popup modal
 */
const StoryPopup = ({ title, children }: { title: string, children: React.ReactNode, }) => {
    // const { title, children } = props;
    const [show, setShow] = useState(true);

    return show ? (
        <Modal
            // {...props}
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            // aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    // id="contained-modal-title-vcenter"
                >{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShow(false)}
                >Close</Button>
            </Modal.Footer>
        </Modal>
    ) : undefined;
};

interface IStory {
    id: string;
    title: string;
    text: React.ReactNode;
}

const story: IStory[] = [
    {
        id: "chapter1",
        title: "Chapter 1: Awakening in the Abyss",
        text: <p>
            After an eternal sleep, you wake up in a vast cosmic abyss, feeling trapped by the pull of a relentless black hole.
            A mysterious force compels you to collect cosmic particles, each one bringing hope as you try to amass enough mass to break free from the void&apos;s grip.
        </p>,
    },
];

/**
 * @returns React component for the story
 */
// function Story () {
//     const [showedStory, setShowedStory] = useState("");
//     const storyComponents = story.map((s) => {
//         // const [show, setShow] = useState(false);
//         return (
//             <StoryPopup
//                 key={s.id}
//                 title={s.title}
//                 // show={show}
//             >
//                 {s.text}
//             </StoryPopup>
//         );
//     });
//     return (
//         <div>
//             {storyComponents}
//         </div>
//     );
// }

/**
 * Show a story popup
 * @param id The id of the story to show
 */
function showStory (id: string) {
    const selectedStory = story.find((s) => s.id === id);
    if (selectedStory) {
        console.log(`Showing story \`${id}\``);
        uiLayer.render(
            <StoryPopup title={selectedStory.title}>
                {selectedStory.text}
            </StoryPopup>,
        );
    } else {
        console.error(`Story with id ${id} not found`);
    }
}

// Debug
(window as any).showStory = showStory;

export { showStory };