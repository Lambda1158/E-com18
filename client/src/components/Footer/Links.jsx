import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
const data = [
  {
    icon: <FaFacebookSquare />,
    link: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/",
    label: "Instragram",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/brunoherrera1158/",
    label: "Linkedin",
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/Lambda1158",
    label: "Github",
  },
  { icon: <FaYoutube />, link: "https://www.youtube.com/", label: "Youtube" },
];
export default function LinksRedes() {
  return (
    <ul>
      {data.map((element, index) => {
        return (
          <li
            className="hover:underline hover:scale-105 duration-300"
            key={index}
          >
            <a
              target="blank"
              className="flex items-center space-x-2"
              href={element.link}
            >
              {element.icon}
              <span>{element.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
