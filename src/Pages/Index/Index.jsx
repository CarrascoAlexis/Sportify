import { useEffect, useState } from "react"

export default function Index()
{
    let slideIndex = 0

    const changeSlide = (n) => {
        showSlide(slideIndex += n)
    }

    const showSlide = (n) => {
        let i;
        let slides = document.getElementsByClassName("slidePart");
        console.log(slides)
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        // for (i = 0; i < dots.length; i++) {
        //   dots[i].className = dots[i].className.replace(" active", "");
        // }
        // slides[slideIndex-1].style.display = "block";
        // dots[slideIndex-1].className += " active";
    }

    useEffect(() => {
        showSlide(1)
    }, [])

    return(
        <>
            <div className="slideshow">
                <div className="slidePart">
                    <img src="/images/event-pgw.jpg" alt="Paris Games Week"/>
                    <div className="text">Caption Text</div>
                </div>
                <div className="slidePart">
                    <img src="/images/event-zevent.jpg" alt="ZEvent" />
                    <div className="text">Caption Text</div>
                </div>
                <div className="slidePart">
                    <img src="/images/event-zlan.jpg" alt="ZLan" />
                    <div className="text">Caption Text</div>
                </div>
            </div>
        </>
    )
}