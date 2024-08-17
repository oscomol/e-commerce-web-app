import { Flex } from "@chakra-ui/react";
import React from "react";

import Common from "../common/Common";
import Cards from "../common/Cards";

const Faq = () => {
    const aboutPage = [
        {
            header: "Christian M. Lomocso",
            body: "At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]. Our journey began [mention how and when your store started], and since then, we've been committed to [briefly mention your commitment to quality, customer satisfaction, etc.]. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        },
        {
            header: "Xtian M. Lomocso",
            body: "Once upon a time, in a bustling city where dreams sparkled like stars in the night sky, there was a small team of dreamers. Each one carried within them a passion for craftsmanship and a vision to create something truly special. It all began with a simple idea – to bring joy to people's lives through the art of gifting. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        },
        {
            header: "Our Vision",
            body: "At [Your Store Name], we envision a world where every gift is an expression of love, every moment is cherished, and every smile is genuine. With this vision as our guiding light, we're committed to spreading joy and creating memories that last a lifetime. Join us on this journey as we continue to craft moments and build connections one gift at a time. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        },
        {
            header: "Our Values",
            body: "Transparency, integrity, and customer satisfaction are at the core of everything we do. We believe in building long-lasting relationships with our customers and partners based on trust and mutual respect. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        },
        {
            header: "Our Team",
            body: "Meet the passionate individuals behind [Your Store Name]. Our team is made up of dedicated professionals who share a common goal: to exceed customer expectations and deliver exceptional service. Meet the passionate individuals behind [Your Store Name]. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        },
        {
            header: "Community Engagement",
            body: "Giving back to the community is an integral part of our ethos. We actively participate in local events, support charitable initiatives, and strive to make a positive impact wherever we go. ",
            reply: "Hai Christian, At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]."
        }
    ];

    return (
        <Common
            page='Faq'
            body={<Flex flexDir='column' gap='50px'>
                {aboutPage.map(about => (
                <React.Fragment key={about.header}>
                    <Cards about={about} photo={true} />
                </React.Fragment>
            ))}
            </Flex>}
        />
    );
};

export default Faq;
