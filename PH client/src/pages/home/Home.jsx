import React from "react";
import Carasol from "./Carasol";
import WhoWeAre from "./WhoWeAre";
import PriorityEvents from "./PriorityEvents";
import Testimonials from "./Testimonials";
import ImageGallery from "./ImageGallery";
import { Helmet } from "react-helmet";
import Contact from "./Contact";
import EventOverview from "./EventOverview";

export default function Home() {
  // Carousel state

  // Testimonial state

  // Gallery Modal

  return (
    <>
      <main className="bg-gradient-to-br from-white to-[#FFF9F5] min-h-screen text-[#232323]">
        {/* carsol */}
        <Carasol />
        {/* who we are */}
        <WhoWeAre />
        {/* priority events */}
        {/* event over view */}
        <EventOverview/>
        {/* priority */}
        <PriorityEvents />
        {/* Testimonials */}
        <Testimonials />
        {/* Gallery */}
        <ImageGallery />

        {/* Contact Form */}
        <Contact/>
      </main>
      <Helmet>
        <title>Eventify || Home</title>
      </Helmet>
    </>
  );
}
