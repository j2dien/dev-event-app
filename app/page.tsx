import ExploreBtn from "@/components/ExploreBtn";
import React from "react";

export default function Page() {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Developer <br /> Event You Mustn&lsquo;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
      </div>
    </section>
  );
}
