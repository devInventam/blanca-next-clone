"use client";

import React, { useState, useEffect } from "react";
import Preloader from '../../components/common/Preloader';
import ScrollToTop from '../../components/common/ScrollToTop';
import AboutHero from '../../components/about/AboutHero';
import AboutSection from '../../components/about/AboutMainSection';
import AboutBlueprintSection from '../../components/about/AboutBlueprintSection';
import VisionSection from '../../components/about/VisionSection';
import MissionSection from '../../components/about/MissionSection';
import JourneySection from '../../components/about/JourneySection';
import ShowcaseSection from "../../components/about/ShowcaseSection";
import TeamSlider from '../../components/about/TeamSlider';
import { AnimatePresence } from 'framer-motion';
// import SEO from '../../components/common/Seo/Seo';

const About = ({ aboutPageResponse, settingResponse, journeyResponse }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // SPA route changes don't re-fire `window.load`, so relying on it can
        // leave the preloader stuck forever (especially on rapid/double nav).
        const t = window.setTimeout(() => setIsLoading(false), 800);
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // or "smooth"
        });
    }, []);

    const { teamItems, showcaseSlides, heroMessages } = React.useMemo(() => {
        const raw = aboutPageResponse;
        const groups = raw?.data ?? raw?.message?.data ?? raw;
        const list = Array.isArray(groups) ? groups : [];

        const byModel = list.reduce((acc, g) => {
            if (!g) return acc;
            const model = String(g?.model ?? "");
            if (!model) return acc;
            const data = Array.isArray(g?.data) ? g.data : [];
            if (!acc[model]) acc[model] = [];
            acc[model].push(...data);
            return acc;
        }, {});

        const teamRaw = byModel["Team"] ?? [];
        const showcaseRaw = byModel["Showcase"] ?? [];
        const aboutUsRaw = byModel["AboutUs"] ?? [];

        const team = teamRaw
            .map((item) => {
                const fields = item?.fields ?? {};
                return {
                    name: fields?.title ?? "",
                    quote: fields?.description ?? "",
                    image: fields?.image ?? "",
                };
            })
            .filter((t) => t?.name || t?.quote || t?.image);

        const showcase = showcaseRaw
            .map((item) => {
                const fields = item?.fields ?? {};
                return {
                    title: fields?.title ?? "",
                    text: fields?.description ?? "",
                    image: fields?.image ?? "",
                };
            })
            .filter((s) => s?.title || s?.text || s?.image);

        const aboutMessages = aboutUsRaw
            .flatMap((item) => {
                const messages = item?.fields?.messages;
                if (Array.isArray(messages)) return messages;
                if (typeof messages === "string") return [messages];
                return [];
            })
            .map((message) => (typeof message === "string" ? message.trim() : ""))
            .filter(Boolean);

        return { teamItems: team, showcaseSlides: showcase, heroMessages: aboutMessages };
    }, [aboutPageResponse]);

    return (
        <div className="about-page">
            {/* <SEO /> */}
            <AnimatePresence>
                {isLoading && <Preloader key="preloader" isLoading={isLoading} />}
            </AnimatePresence>
            <main>
                <AboutHero messages={heroMessages} settingResponse={settingResponse} />
                <AboutSection />
                <AboutBlueprintSection />
                <VisionSection />
                <MissionSection />
                <JourneySection journeyResponse={journeyResponse} />
                <TeamSlider items={teamItems} />
                <ShowcaseSection slides={showcaseSlides} />
            </main>
            <ScrollToTop />
        </div>
    );
};

export default About;
