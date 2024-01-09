/**
 * @file Story text and popups
 */
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Game from "../game";
import { uiLayer } from "./uiLayer";

/**
 * React component for the popup modal
 * @param props
 */
const StoryPopup = (props: any) => {
    const { title, children } = props;
    const [show, setShow] = React.useState(true);

    return (
        <Modal
            {...props}
            show={show}
            onHide={() => setShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const story = [
    {
        id: "chapter1",
        title: "Chapter 1: Awakening in the Abyss",
        text: <p>
            After a timeless sleep, you wake up in a vast cosmic abyss, feeling trapped by the pull of a relentless black hole.
            A mysterious force compels you to collect cosmic particles, each one bringing hope as you try to amass enough mass to break free from the void&apos;s grip.
        </p>,
    },
];

/**
 * Show a story popup
 * @param id The id of the story to show
 */
function showStory (id: string) {
    for (let i = 0; i < story.length; i++) {
        if (story[i].id === id) {
            uiLayer.render(<StoryPopup title={story[i].title}>
                {story[i].text}
            </StoryPopup>);
            return;
        } else continue;
    }
    console.error(`Story with id ${id} not found`);
}

// Debug
(window as any).showStory = showStory;

export { showStory };