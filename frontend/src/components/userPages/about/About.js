import { Flex } from "@chakra-ui/react";
import React from "react";

import Common from "../common/Common";
import Cards from "../common/Cards";

const About = () => {
    const aboutPage = [
        {
            header: "About our store",
            body: "At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]. Our journey began [mention how and when your store started], and since then, we've been committed to [briefly mention your commitment to quality, customer satisfaction, etc.]. At [Your Store Name], we're passionate about [briefly mention your mission or what sets your store apart]. Our journey began [mention how and when your store started], and since then, we've been committed to [briefly mention your commitment to quality, customer satisfaction, etc.].",
            photo: ['vision.jpg', 'team.jfif']
        },
        {
            header: "Our story",
            body: "Once upon a time, in a bustling city where dreams sparkled like stars in the night sky, there was a small team of dreamers. Each one carried within them a passion for craftsmanship and a vision to create something truly special. It all began with a simple idea – to bring joy to people's lives through the art of gifting. And thus, [Your Store Name] was born. But this wasn't just any ordinary store; it was a haven of creativity, a sanctuary for those who sought to celebrate life's moments in style. With sleeves rolled up and hearts full of determination, our founders embarked on a journey fueled by innovation and a relentless pursuit of excellence. Once upon a time, in a bustling city where dreams sparkled like stars in the night sky, there was a small team of dreamers. Each one carried within them a passion for craftsmanship and a vision to create something truly special. It all began with a simple idea – to bring joy to people's lives through the art of gifting. And thus, [Your Store Name] was born. But this wasn't just any ordinary store; it was a haven of creativity, a sanctuary for those who sought to celebrate life's moments in style. With sleeves rolled up and hearts full of determination, our founders embarked on a journey fueled by innovation and a relentless pursuit of excellence.",
            photo: ['vision.jpg', 'team.jfif']
        },
        {
            header: "Our Vision",
            body: "At [Your Store Name], we envision a world where every gift is an expression of love, every moment is cherished, and every smile is genuine. With this vision as our guiding light, we're committed to spreading joy and creating memories that last a lifetime. Join us on this journey as we continue to craft moments and build connections one gift at a time. At [Your Store Name], we envision a world where every gift is an expression of love, every moment is cherished, and every smile is genuine. With this vision as our guiding light, we're committed to spreading joy and creating memories that last a lifetime. Join us on this journey as we continue to craft moments and build connections one gift at a time.",
            photo: ['vision.jpg', 'team.jfif']
        },
        // Add more items below
        {
            header: "Our Values",
            body: "Transparency, integrity, and customer satisfaction are at the core of everything we do. We believe in building long-lasting relationships with our customers and partners based on trust and mutual respect. Transparency, integrity, and customer satisfaction are at the core of everything we do. We believe in building long-lasting relationships with our customers and partners based on trust and mutual respect. Transparency, integrity, and customer satisfaction are at the core of everything we do. We believe in building long-lasting relationships with our customers and partners based on trust and mutual respect.",
            photo: ['vision.jpg', 'team.jfif']
        },
        {
            header: "Our Team",
            body: "Meet the passionate individuals behind [Your Store Name]. Our team is made up of dedicated professionals who share a common goal: to exceed customer expectations and deliver exceptional service. Meet the passionate individuals behind [Your Store Name]. Our team is made up of dedicated professionals who share a common goal: to exceed customer expectations and deliver exceptional service. Meet the passionate individuals behind [Your Store Name]. Our team is made up of dedicated professionals who share a common goal: to exceed customer expectations and deliver exceptional service.",
            photo: ['vision.jpg', 'team.jfif']
        },
        {
            header: "Community Engagement",
            body: "Giving back to the community is an integral part of our ethos. We actively participate in local events, support charitable initiatives, and strive to make a positive impact wherever we go. Giving back to the community is an integral part of our ethos. We actively participate in local events, support charitable initiatives, and strive to make a positive impact wherever we go. Giving back to the community is an integral part of our ethos. We actively participate in local events, support charitable initiatives, and strive to make a positive impact wherever we go.",
            photo: ['vision.jpg', 'team.jfif']
        }
    ];

    return (
        <Common
            page='About us'
            body={<Flex flexDir='column' gap='50px'>
                {aboutPage.map(about => (
                <React.Fragment key={about.header}>
                    <Cards about={about} show={true}/>
                </React.Fragment>
            ))}
            </Flex>}
        />
    );
};

export default About;
