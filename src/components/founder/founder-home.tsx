import FounderHero from "./founder-hero";
import OutcomesWall from "./outcomes-wall";
import HowIBuild from "./how-i-build";
import BeyondCode from "./beyond-code";
import ShippedFast from "./shipped-fast";
import WhatIDo from "./what-i-do";
import WritingLink from "./writing-link";
import FounderContact from "./founder-contact";
import FounderCodingStats from "./founder-coding-stats";
import Experience from "@/components/experience";

const FounderHome = () => {
  return (
    <>
      <FounderHero />
      <OutcomesWall />
      <ShippedFast />
      <HowIBuild />
      <BeyondCode />
      <Experience />
      <WhatIDo />
      <FounderCodingStats />
      <WritingLink />
      <FounderContact />
    </>
  );
};

export default FounderHome;
